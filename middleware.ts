import { rewrite } from "@vercel/edge";

export default function middleware(req: Request) {
  console.log("URL requested", req.url);

  const url = new URL(req.url);
  const subdomain = url.host.split(".")[0];

  console.log("Subdomain", subdomain);

  switch (subdomain) {
    case "pranay": // if there's no subdomain, it'll show up as "pranay"
    case "www":
      // For blog, we rewrite to have the right certificate
      url.host = "blog.pranay.gp"; // svbtle
      return rewrite(url);
    case "pgp":
    case "key":
      return redirect(
        "https://keys.openpgp.org/vks/v1/by-fingerprint/69CC0E8F6D41F6373F9DAE17547249897F9BE56F"
      );
    case "cal":
    case "calendar":
      return redirect("https://cal.com/pranay");
    case "e":
    case "hey":
    case "mail":
    case "email":
      return redirect("mailto:hey@pranay.gp");
    case "t":
    case "twitter":
      return redirect("https://twitter.com/pranaygp");
    case "g":
    case "github":
      return redirect("https://github.com/pranaygp");
    default:
      return new Response("Not found", { status: 404 });
  }
}

function redirect(url) {
  return new Response(null, {
    status: 308, // Permanent Redirect
    headers: {
      Location: url,
    },
  });
}
