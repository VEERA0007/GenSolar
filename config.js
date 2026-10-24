/* Gensolar app settings. Edit this file, then upload it to GitHub.

   Sign-in here is a light gate for your team. This is a static site with no server,
   so anyone who reads the page source can see the user list. Do not rely on it to
   protect private data.

   Add a user: make the SHA-256 hash of their password (see README), then add a row. */
window.GENSOLAR_CONFIG = {
  users: [
    // Demo sign-in: user "gensolar", password "Gensolar@123". Replace before sharing the link.
    { id: 'gensolar', name: 'Gensolar Sales', hash: 'a3d293f4ef78922a01fa198748e097d418459e17bfd6b3f2b2572060024c02c5' }
  ],
  // Where "Explore GenSolar" goes. Leave as is to open the calculator without signing in,
  // or put your company website address here, for example 'https://www.example.com'.
  exploreUrl: 'estimator.html?guest=1'
};
