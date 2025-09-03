const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const inquirer = require("inquirer"); // 引入 inquirer

const showAll = process.argv.includes("showAll");

const pkgPath = path.resolve(__dirname, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

const allDeps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

console.log("📦 检查依赖更新中...\n");

const getLatestVersion = (pkgName) => {
  return new Promise((resolve) => {
    exec(`npm show ${pkgName} version`, (err, stdout) => {
      const latest = stdout.trim();
      const current = allDeps[pkgName];
      const currentClean = current.replace(/^[~^]/, "");

      const isOutdated = currentClean !== latest;

      // 判断是否为“安全”更新
      const isSafeUpdate =
        !isOutdated ||
        (currentClean.split(".")[0] === latest.split(".")[0] &&
          currentClean.split(".")[1] === latest.split(".")[1]);

      const [currentMajor, currentMinor, currentPatch] =
        currentClean.split(".");
      const [latestMajor, latestMinor, latestPatch] = latest.split(".");

      let updateCategory = "patch"; // 默认为补丁版本更新

      if (currentMajor !== latestMajor) {
        updateCategory = "major"; // 主要版本更新
      } else if (currentMinor !== latestMinor) {
        updateCategory = "minor"; // 次要版本更新
      }

      resolve({
        pkgName,
        current,
        latest,
        isOutdated,
        isSafeUpdate,
        updateCategory,
      });
    });
  });
};

(async () => {
  const results = await Promise.all(Object.keys(allDeps).map(getLatestVersion));
  const filtered = showAll ? results : results.filter((r) => r.isOutdated);

  console.log(
    `🔍 共检查 ${results.length} 个依赖，${filtered.length} 个需要更新：\n`
  );

  // 按照更新类别分组
  const majorUpdates = filtered.filter((r) => r.updateCategory === "major");
  const minorUpdates = filtered.filter((r) => r.updateCategory === "minor");
  const patchUpdates = filtered.filter((r) => r.updateCategory === "patch");

  // 输出补丁版本更新
  console.log("\n🎉 补丁版本更新：");
  patchUpdates.forEach(({ pkgName, current, latest, isOutdated }) => {
    const mark = isOutdated ? "⬆️" : "✅";
    console.log(
      `${mark} ${pkgName.padEnd(35)} 当前: ${current.padEnd(
        10
      )} 最新: ${latest}`
    );
  });

  // 输出次要版本更新
  console.log("\n🎉 次要版本更新：");
  minorUpdates.forEach(({ pkgName, current, latest, isOutdated }) => {
    const mark = isOutdated ? "⬆️" : "✅";
    console.log(
      `${mark} ${pkgName.padEnd(35)} 当前: ${current.padEnd(
        10
      )} 最新: ${latest}`
    );
  });

  // 输出主要版本更新
  console.log("\n⚠️ 主要版本更新（可能需要更多注意）：");
  majorUpdates.forEach(({ pkgName, current, latest, isOutdated }) => {
    const mark = isOutdated ? "⬆️" : "✅";
    console.log(
      `${mark} ${pkgName.padEnd(35)} 当前: ${current.padEnd(
        10
      )} 最新: ${latest}`
    );
  });

  // 提供用户选择更新依赖（多选）
  const updateChoices = [
    ...patchUpdates.map((r) => ({
      name: `${r.pkgName} （补丁版本更新）`,
      value: `${r.pkgName}@${r.latest}`, // 添加版本号
    })),
    ...minorUpdates.map((r) => ({
      name: `${r.pkgName} （次要版本更新）`,
      value: `${r.pkgName}@${r.latest}`, // 添加版本号
    })),
    ...majorUpdates.map((r) => ({
      name: `${r.pkgName} （主要版本更新）`,
      value: `${r.pkgName}@${r.latest}`, // 添加版本号
    })),
  ];

  // 使用 inquirer 的 createPromptModule 获取提示功能
  const prompt = inquirer.createPromptModule();

  const answers = await prompt([
    {
      type: "checkbox", // 修改为多选
      name: "updateDeps",
      message: "请选择要更新的依赖：",
      choices: updateChoices,
    },
  ]);

  // 如果用户选择了更新
  if (answers.updateDeps.length > 0) {
    console.log("\n🎉 执行更新指令：");
    console.log(
      `npm install ${answers.updateDeps.join(" ")} --legacy-peer-deps`
    );
    exec(
      `npm install ${answers.updateDeps.join(" ")} --legacy-peer-deps`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(`执行错误: ${stderr}`);
          return;
        }
        console.log(stdout);
      }
    );
  } else {
    console.log("\n🎉 退出更新。");
  }

  console.log("\n🎉 完成！");
})();
