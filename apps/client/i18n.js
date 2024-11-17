module.exports = {
  locales: [
    "en",
    "da",
    "de",
    "es",
    "fr",
    "no",
    "pt",
    "se",
    "tl",
    "it",
    "he",
    "tr",
    "hu",
    "th",
    "zh-CN",
    "ru",
  ],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "rgx:^(/|/settings.*)": ["_layout_settings", "_sidebar_dashboard", "dashboard", "_modal_create_ticket", "_component_account_dropdown"],
    "/settings/notifications": ["settings_notifications"],
    "/auth/login": ["auth_login"],
    "/auth/forgot-password": ["forgot_password"],
    "/onboarding": ["onboarding"],
    "rgx:^/admin.*": ["_layout_admin"],
    "rgx:^/portal.*": ["_layout_portal", "dashboard"],
    "/admin/users/internal": ["admin_users_internal"],
    "/admin/users/internal/new": ["admin_users_internal_new"],
    "/admin/clients/new": ["admin_clients_new"],
    "/admin/clients": ["admin_clients"]
  },
  localeDetection: true,
};
