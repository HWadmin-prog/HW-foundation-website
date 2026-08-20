 module.exports = function (eleventyConfig) { 
eleventyConfig.addPassthroughCopy("src/styles.css"); 
eleventyConfig.addPassthroughCopy("src/hero-bg.webp"); 
eleventyConfig.addPassthroughCopy("src/admin"); 
eleventyConfig.addPassthroughCopy({ "src/images": "images" }); 
eleventyConfig.addCollection("articles", function (collectionApi) { return collectionApi.getFilteredByGlob("src/articles/*.md").sort((a, b) => { return new Date(a.data.date) - new Date(b.data.date); }); }); 
return { dir: { input: "src", output: "_site", includes: "_includes", }, htmlTemplateEngine: "njk", markdownTemplateEngine: "njk", };
};
