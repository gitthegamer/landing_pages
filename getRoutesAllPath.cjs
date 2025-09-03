// generate-sitemap.cjs
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const routesFile = path.resolve("./src/library/routes.jsx");
const code = fs.readFileSync(routesFile, "utf-8");

// 解析 JSX/ESM
const ast = parser.parse(code, {
  sourceType: "module",
  plugins: ["jsx"],
});

// 递归提取 path
function extractPathsFromNode(node, scope = {}) {
  const paths = [];
  if (!node) return paths;

  switch (node.type) {
    case "ArrayExpression":
      for (const el of node.elements) {
        paths.push(...extractPathsFromNode(el, scope));
      }
      break;

    case "ObjectExpression":
      let pathValue = null;
      let childrenNode = null;
      for (const prop of node.properties) {
        const keyName = prop.key.name || prop.key.value;
        if (keyName === "path") {
          if (prop.value.type === "StringLiteral") pathValue = prop.value.value;
          else if (prop.value.type === "Literal") pathValue = prop.value.value;
        }
        if (keyName === "children") {
          childrenNode = prop.value;
        }
      }
      if (pathValue && pathValue !== "*") paths.push(pathValue);
      if (childrenNode)
        paths.push(...extractPathsFromNode(childrenNode, scope));
      break;

    case "SpreadElement":
      if (node.argument.type === "Identifier" && scope[node.argument.name]) {
        paths.push(...extractPathsFromNode(scope[node.argument.name], scope));
      }
      break;

    case "Identifier":
      if (scope[node.name]) {
        paths.push(...extractPathsFromNode(scope[node.name], scope));
      }
      break;
  }

  return paths;
}

// 构建作用域
const scope = {};
traverse(ast, {
  VariableDeclarator({ node }) {
    if (node.id.name && node.init) {
      scope[node.id.name] = node.init;
    }
  },
});

// 提取 routes
let allPaths = extractPathsFromNode(scope["routes"], scope);

// 去重
allPaths = [...new Set(allPaths)].filter((p) => p !== "(.*)");

module.exports = allPaths;
