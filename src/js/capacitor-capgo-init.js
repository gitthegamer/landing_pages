import { CapacitorUpdater } from "@capgo/capacitor-updater";
import { App as CapApp } from "@capacitor/app";
import { f7 } from "framework7-react";

export const checkForUpdates = async () => {
  await CapacitorUpdater.notifyAppReady();

  CapacitorUpdater.addListener("appReady", () => {});

  CapacitorUpdater.addListener("updateAvailable", async (res) => {
    try {
      await CapacitorUpdater.set(res.bundle);
    } catch (error) {}
  });

  let dialog;
  CapacitorUpdater.addListener("download", (info) => {
    if (!dialog) {
      dialog = f7.dialog.progress("Downloading...", 0);
    }
    dialog.text = "Downloading... " + info.percent + "%";
    const progress = info.percent;
    dialog.setProgress(progress);

    if (progress >= 100) {
      dialog.close();
      dialog = null;
    }
  });

  CapacitorUpdater.addListener("downloadFailed", async (error) => {
    f7.dialog.confirm(
      "Download failed. Do you want to restart the app?",
      "",
      () => {
        CapApp.restart(); // If confirmed, restart the app
      }
    );
  });
  /* -------------------------------------------------------------- */

  try {
    const latest = await CapacitorUpdater.getLatest();
    if (latest.url) {
      f7.dialog.confirm(
        "A new version is available. Do you want to download the update?",
        "",
        async () => {
          await CapacitorUpdater.download({
            url: latest.url,
            version: latest.version,
            sessionKey: latest.sessionKey,
          });
        }
      );
    }
  } catch (error) {}
};

export const handleAppStateChange = async (state) => {
  if (state.isActive) {
    await checkForUpdates();
  }
};
