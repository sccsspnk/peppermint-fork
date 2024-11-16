import { useRouter } from "next/router";

import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useUser } from "../store/session";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  const { user } = useUser();

  async function updateFirstLogin() {
    await fetch(`/api/v1/auth/user/${user.id}/first-login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push("/");
        }
      });
  }

  return (
    <div className="bg-background">
      <div className="flex justify-center align-center h-screen items-center">
        <div className="bg-background shadow-xl rounded-lg lg:p-8 p-4 mx-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl text-foreground font-bold">
                {t("onboarding:page.title")}{" "}
              </h1>
              <p className="text-foreground">
                {t("onboarding:page.subtitle", {
                  product_name: t("common:main.product_name"),
                })}
              </p>
            </div>
          </div>
          <div className="mt-4 ">
            <div className="flex flex-col space-y-4">
              <div className="border p-2 md:p-6 rounded-md border-dashed flex flex-col md:flex-row space-x-4 items-center">
                <img
                  src={t("onboarding:table.github.icon")}
                  className="h-10 w-10"
                />
                <div className="flex flex-col align-center lg:w-[36em]">
                  <span className="font-bold text-lg">
                    {t("onboarding:table.github.title")}
                  </span>
                  <span className="max-w-lg  text-xs md:text-md">
                    {t("onboarding:table.github.subtitle")}
                  </span>
                </div>
                <Link
                  target="_blank"
                  href={t("onboarding:table.github.button_link")}
                  className="rounded-md mt-4 sm:mt-0 bg-gray-600 px-2.5 whitespace-nowrap hover:text-white py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 "
                >
                  {t("onboarding:table.github.button")}
                </Link>
              </div>
              <div className="border p-2 md:p-6 rounded-md border-dashed w-full flex flex-col md:flex-row space-x-4 items-center">
                <img
                  src={t("onboarding:table.docs.icon")}
                  className="h-10 w-10"
                />
                <div className="flex flex-col align-center lg:w-[36em]">
                  <span className="font-bold text-lg">
                    {t("onboarding:table.docs.title")}
                  </span>
                  <span className="max-w-lg text-xs md:text-md">
                    {t("onboarding:table.docs.subtitle", {
                      product_name: t("common:main.product_name"),
                    })}
                  </span>
                </div>
                <Link
                  target="_blank"
                  href={t("onboarding:table.docs.button_link")}
                  className="rounded-md flex-end bg-green-600 mt-4 whitespace-nowrap sm:mt-0 px-2.5 py-1.5 text-sm font-semibold hover:text-white text-white shadow-sm hover:bg-green-500 "
                >
                  {t("onboarding:table.docs.button")}
                </Link>
              </div>
              <div className="border p-2 md:p-6 rounded-md border-dashed flex flex-col md:flex-row space-x-4 items-center ">
                <img
                  src={t("onboarding:table.discord.icon")}
                  className="h-10 w-10"
                />
                <div className="flex flex-col align-center lg:w-[36em]">
                  <span className="font-bold text-lg">
                    {t("onboarding:table.discord.title")}
                  </span>
                  <span className="max-w-lg text-xs md:text-md">
                    {t("onboarding:table.discord.subtitle")}
                  </span>
                </div>
                <Link
                  target="_blank"
                  href={t("onboarding:table.discord.button_link")}
                  className="rounded-md bg-blue-600 mt-4 whitespace-nowrap sm:mt-0 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
                >
                  {t("onboarding:table.discord.button")}
                </Link>
              </div>
            </div>
          </div>
          <div className="float-right mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-2.5 py-1.5 mr-6 text-sm font-semibold rounded-lg"
              onClick={() => updateFirstLogin()}
            >
              {t("onboarding:buttons.to_dashboard")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
