CHATHAM MILLS WEBSITE

PUBLISH TO NETLIFY
1. Unzip this folder.
2. Go to app.netlify.com/drop and sign in.
3. Drag the whole chatham-mills-site folder onto the page.
4. To update later: open the site in Netlify, go to Deploys, and drag the updated folder onto that page.
5. Custom domain: Site configuration > Domain management > Add a domain, then follow the DNS steps.

WHAT'S IN HERE
index.html        Homepage
businesses.html   Current tenants page
styles.css        All colors, fonts, and layout
main.js           Nav scroll effect, mobile menu, tenant filters
images/           Logo files (put your photos here too)

EDITING TEXT
Open any .html file in a text editor (VS Code is free) and change the words.
Anything in [brackets] is a placeholder to fill in, like [PHONE] and [EMAIL].

PHOTOS
Real photos are in images/ (hero-mill-front.jpg, archival-weavers.jpg, and so on).
To swap one, save a new photo over it with the same file name.
The Events section still has three placeholder spots waiting for event photos,
and most tenant rows on the businesses page still need photos.

BACKGROUND PATTERN
The punch-card background is images/jacquard-teal.svg (on cream) and
images/jacquard-cream.svg (on teal and rust). To turn it off, delete the
.weave and .weave-lt lines near the top of styles.css.

ADDING PHOTOS TO A PLACEHOLDER
Each placeholder spot looks like this:
  <figure class="ph ..."><div class="zi t-brick"></div><figcaption ...>Photo · description</figcaption></figure>
Replace the <div class="zi ..."></div> with:
  <img class="zi" src="images/your-photo.jpg" alt="Short description of the photo">
Then delete the <figcaption> line. Keep photos around 2000px wide, saved as .jpg.

ADDING A TENANT
In businesses.html, copy one <article class="trow" ...> block and update it.
Set data-cat to one of the filter names exactly (for example data-cat="Food &amp; Drink").
The filter counts update on their own.

FONTS
The headline font is Barlow Semi Condensed, standing in for Dress Code.
To use Dress Code: add the font files, add an @font-face rule at the top of styles.css,
and change --display to 'Dress Code'.
