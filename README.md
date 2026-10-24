# Gensolar App

Welcome screen with sign-in, followed by the Gensolar rooftop solar cost estimator for residential, commercial and industrial customers in Andhra Pradesh, Telangana, Odisha and Chhattisgarh.

- `index.html` is the welcome page (logo, Login, Explore GenSolar).
- `estimator.html` is the cost estimator. It opens after sign-in, or as a guest from "Explore GenSolar" and the three cards.
- `config.js` holds the user list and the Explore link.
- `assets/` holds the logo banner and photos.

It is a static site with no build step and no backend.

## Sign in

The demo user is `gensolar` with password `Gensolar@123`. Change it before sharing the link.

Sign-in is a light gate for your team, not real security. The site has no server, so anyone who reads the page source can see the user list and password hashes. Do not put private data behind it.

To add a user, make the SHA-256 hash of the password and add a row to `config.js`:

```
echo -n "MyPassword" | sha256sum
```

```js
{ id: 'ravi', name: 'Ravi Kumar', hash: '<the hash>' }
```

To send "Explore GenSolar" to your company website, set `exploreUrl` in `config.js` to its address.

## Put it online with GitHub Pages

1. Create a new repository on GitHub, for example `gensolar-app`.
2. Upload every file from this folder, including the hidden `.github` folder, or push with git:
   ```
   git init
   git add .
   git commit -m "Gensolar app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gensolar-app.git
   git push -u origin main
   ```
3. In the repository, open Settings, then Pages, and set Source to GitHub Actions.
4. The workflow deploys on every push to `main`. The site appears at `https://<your-username>.github.io/gensolar-app/`.

Sign-in needs the https address that GitHub Pages gives you.

## Changing rates and prices

Open `estimator.html` and edit the `STATES` block (grid tariffs and city yields) and the `autoCost` function (price per kW by system size). Users can also change every assumption on the page itself.

## Data and limits

- Grid tariffs are for FY 2026-27 from the Telangana (TGERC), Chhattisgarh (CSPDCL) and Odisha (OERC) schedules. Andhra Pradesh figures come from third-party pages citing the APERC order, and the AP and Odisha industrial rates need checking against the official orders.
- Only energy charges are used. Fixed and demand charges are left out because solar does not offset them.
- PM Surya Ghar subsidy: ₹30,000 per kW for the first 2 kW, ₹78,000 maximum, residential only.
- System prices and city yields are approximate defaults.

This is an indicative estimate. Final design, price and subsidy eligibility depend on a site survey and DISCOM approval.
