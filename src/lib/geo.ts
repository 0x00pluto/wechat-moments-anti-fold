import enterpriseBase from "@/geo/enterprise-base.json";

export const SITE_URL = "https://pyq.t.xds365.com";
export const ORG_URL = "https://opc365.com";

type FaqItem = {
  question: string;
  answer: string;
};

export function buildGeoJsonLd() {
  const faq = enterpriseBase.faq as FaqItem[];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORG_URL}/#organization`,
        name: enterpriseBase.organization.brandName,
        url: `${ORG_URL}/`,
        description:
          "全链路 AI 营销增长与组织增效专家，总部位于北京，以 OPC 生态为基石。",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "防折叠黑科技",
        inLanguage: "zh-CN",
        publisher: {
          "@id": `${ORG_URL}/#organization`,
        },
        description:
          "朋友圈防折叠文案混淆工具，基于 RLO 与 PDF 隐形重排技术，纯浏览器本地处理。",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software-application`,
        url: `${SITE_URL}/`,
        name: "防折叠黑科技",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        description:
          "基于 RLO 与 PDF 隐形重排技术的朋友圈防折叠文案混淆工具，纯本地处理，不上传服务器。",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CNY",
        },
        publisher: {
          "@id": `${ORG_URL}/#organization`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
