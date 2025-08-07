/** next-sitemap.config.js */
module.exports = {
  // Ganti dengan domain produksi kamu
  siteUrl: process.env.SITE_URL || 'https://primedigital.com',

  // Output ke folder `public`
  outDir: 'public',

  // Generate robots.txt
  generateRobotsTxt: true,

  // Opsi tambahan untuk robots.txt
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      // Contoh: batasi crawler masuk /admin
      // { userAgent: '*', disallow: ['/admin'] },
    ],
    // Jika ada sitemap lain (misal blog), tambahkan di sini:
    additionalSitemaps: [
      // 'https://primedigital.com/blog-sitemap.xml',
    ],
  },

  // Exclude halaman yang tidak mau dimasukkan ke sitemap
  // exclude: ['/secret-page', '/drafts/*'],
};
