import React, { useEffect, useState } from "react";
import { Button, Toolbar } from "framework7-react";
import navigate from "./action/navigate";
import { useTranslation } from "react-i18next";

function BottomMenu(props) {
  const { t } = useTranslation();
  const bottomMenuItems = [
    { name: "home", path: "/" },
    { name: "promotion", path: "/promotion" },
    { name: "deposit", path: "/deposit", isBlank: true },
    { name: "withdrawal", path: "/withdraw" },
    { name: "account", path: "/settings" },
  ];
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    // Find the active tab based on current location
    const currentTab = bottomMenuItems.find((tab) =>
      tab.name === "home"
        ? location.pathname === "/"
        : location.pathname.startsWith(tab.path)
    );
    setActiveTab(currentTab?.name || null);
  }, [location.pathname]);
  return (
    <>
      {bottomMenuItems.map((tab, index) => {
        return (
          <Button
            onClick={() => navigate(tab.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
            key={index}
            className={`d-flex-column p-2 text-align-center ${
              tab.isBlank ? "blank-tab" : ""
            }`}
          >
            {activeTab && tab.name && !tab.isBlank && (
              <img
                src={`/assets/image/bottommenu/${tab.name}${
                  tab.name === activeTab ? "_active" : "_inactive"
                }.webp`}
                key={`${tab.name}-${
                  tab.name === activeTab ? "active" : "inactive"
                }`}
                alt={tab.label}
                className="icon20 w-auto object-fit-contain mb-1"
              />
            )}
            <span
              style={{
                color: tab.name === activeTab ? "white" : "#002a2b",
              }}
              className={`position-relative text12 text-md16 lh-1`}
            >
              {t(tab.name)}
            </span>
          </Button>
        );
      })}
    </>
  );
}

export default BottomMenu;
