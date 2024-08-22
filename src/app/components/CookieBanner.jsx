"use client";

import { useContext, useState } from "react";
import { CookieContext } from "../contexts/CookieContext";

const CookieBanner = () => {
  const { acceptAllCookies, saveCookiePreferences } = useContext(CookieContext);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    setShowSettings(false);
  };

  return (
    <div className="cookie-banner">
      {!showSettings ? (
        <>
          <p>
            เว็บไซต์นี้ใช้คุกกี้เพื่อประสบการณ์ที่ดีขึ้น
            คุณยินยอมคุกกี้ทั้งหมดหรือไม่?
          </p>
          <button onClick={acceptAllCookies}>ยินยอมทั้งหมด</button>
          <button onClick={() => setShowSettings(true)}>ตั้งค่าคุกกี้</button>
        </>
      ) : (
        <div className="cookie-settings">
          <label>
            <input
              type="checkbox"
              name="analytics"
              checked={preferences.analytics}
              onChange={handlePreferencesChange}
            />
            คุกกี้วิเคราะห์
          </label>
          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={preferences.marketing}
              onChange={handlePreferencesChange}
            />
            คุกกี้การตลาด
          </label>
          <button onClick={handleSavePreferences}>บันทึกการตั้งค่า</button>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
