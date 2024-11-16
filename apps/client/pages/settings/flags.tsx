import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

interface FeatureFlag {
  name: string;
  enabled: boolean;
  description: string;
  flagKey: string;
}

export default function FeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const router = useRouter();
  const { t, lang } = useTranslation();
  const defaultFlags: FeatureFlag[] = [
    {
      name: t("common:settings.feature_flags.keyboard_shortcuts_hide.name"),
      enabled: false,
      description: t(
        "common:settings.feature_flags.keyboard_shortcuts_hide.desc"
      ),
      flagKey: "keyboard_shortcuts_hide", // Added flag key for this feature
    },
    {
      name: t("common:settings.feature_flags.name_hide.name"),
      enabled: false,
      description: t("common:settings.feature_flags.name_hide.desc"),
      flagKey: "name_hide", // Added flag key for this feature
    },
    {
      name: t("common:settings.feature_flags.email_hide.name"),
      enabled: false,
      description: t("common:settings.feature_flags.email_hide.desc"),
      flagKey: "email_hide", // Added flag key for this feature
    },
  ];

  useEffect(() => {
    // Load flags from localStorage on component mount
    const savedFlags = localStorage.getItem("featureFlags");
    if (savedFlags) {
      const parsedFlags = JSON.parse(savedFlags);
      // Merge saved flags with default flags, adding any new flags
      const mergedFlags = defaultFlags.map((defaultFlag) => {
        const savedFlag = parsedFlags.find(
          (f: FeatureFlag) => f.name === defaultFlag.name
        );
        return savedFlag || defaultFlag;
      });
      setFlags(mergedFlags);
      localStorage.setItem("featureFlags", JSON.stringify(mergedFlags));
    } else {
      setFlags(defaultFlags);
      localStorage.setItem("featureFlags", JSON.stringify(defaultFlags));
    }
  }, []);

  const toggleFlag = (flagName: string) => {
    const updatedFlags = flags.map((flag) =>
      flag.name === flagName ? { ...flag, enabled: !flag.enabled } : flag
    );
    setFlags(updatedFlags);
    localStorage.setItem("featureFlags", JSON.stringify(updatedFlags));
    router.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {t("common:settings.feature_flags.title")}
      </h1>
      <div className="space-y-4">
        {flags.map((flag) => (
          <div
            key={flag.name}
            className="flex flex-row items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <div className="font-bold text-sm">{flag.name}</div>
              <div className="text-xs">{flag.description}</div>
            </div>
            <div>
              <button onClick={() => toggleFlag(flag.name)}>
                {flag.enabled
                  ? t("common:options.disable")
                  : t("common:options.enable")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
