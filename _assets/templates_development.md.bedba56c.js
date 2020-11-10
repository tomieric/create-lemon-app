import{g as n,f as s,C as a}from"./common-dca46cb9.js";const t='{"title":"模板开发","frontmatter":{},"headers":[{"level":2,"title":"动态模板","slug":"动态模板"},{"level":3,"title":"输出变量","slug":"输出变量"}],"relativePath":"templates/development.md","lastUpdated":1605017624927.8586}';var p={};const o=a('<h1 id="模板开发"><a class="header-anchor" href="#模板开发" aria-hidden="true">#</a> 模板开发</h1><p><code>create-lemon-app</code> 与 <code>vue-cli</code> 中的 <code>Preset</code> 相同的对话，我们在模板目录中新建<code>prompts.js</code>, 在创建模板时即可调用。对话内部是通过 <a href="https://github.com/SBoudrias/Inquirer.js" target="_blank" rel="noopener noreferrer">inquirer</a> 实现</p><p>例如，直接是问题数组：</p><div class="language-js"><pre><code><span class="token comment">// prompts.js</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>\n    name<span class="token operator">:</span> <span class="token string">&#39;locale&#39;</span><span class="token punctuation">,</span>\n    message<span class="token operator">:</span> <span class="token string">&#39;The locale of project localization.&#39;</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">validate</span><span class="token operator">:</span> <span class="token parameter">input</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token operator">!</span>input<span class="token punctuation">,</span>\n    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;en&#39;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">]</span>\n</code></pre></div><p>例如，一个返回问题数组的函数</p><div class="language-js"><pre><code><span class="token comment">// prompts.js</span>\n\n<span class="token comment">// 将 `package.json` 作为参数传入函数</span>\nmodule<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token parameter">pkg</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> prompts <span class="token operator">=</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      type<span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>\n      name<span class="token operator">:</span> <span class="token string">&#39;locale&#39;</span><span class="token punctuation">,</span>\n      message<span class="token operator">:</span> <span class="token string">&#39;The locale of project localization.&#39;</span><span class="token punctuation">,</span>\n      <span class="token function-variable function">validate</span><span class="token operator">:</span> <span class="token parameter">input</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token operator">!</span>input<span class="token punctuation">,</span>\n      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;en&#39;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n\n  <span class="token comment">// 添加动态对话</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;@vue/cli-plugin-eslint&#39;</span> <span class="token keyword">in</span> <span class="token punctuation">(</span>pkg<span class="token punctuation">.</span>devDependencies <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    prompts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      type<span class="token operator">:</span> <span class="token string">&#39;confirm&#39;</span><span class="token punctuation">,</span>\n      name<span class="token operator">:</span> <span class="token string">&#39;useESLintPluginVueI18n&#39;</span><span class="token punctuation">,</span>\n      message<span class="token operator">:</span> <span class="token string">&#39;Use ESLint plugin for Vue I18n ?&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> prompts\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="动态模板"><a class="header-anchor" href="#动态模板" aria-hidden="true">#</a> 动态模板</h2><p>模板的开发来自于 <code>ejs</code> 模块的渲染，通过问题收集的数据对象，动态渲染到项目新文件。</p><p>比如 <code>package.json</code>：</p><div class="language-js"><pre><code><span class="token punctuation">{</span>\n  <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;%= projectName %&gt;&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;typecheck . &amp;&amp; vite build&quot;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.2&quot;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;@vue/compiler-sfc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.2&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;@vuedx/typecheck&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^0.2.4-0&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;@vuedx/typescript-plugin-vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^0.2.4-0&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;typescript&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.3&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.0.0-rc.8&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h3 id="输出变量"><a class="header-anchor" href="#输出变量" aria-hidden="true">#</a> 输出变量</h3><p>使用 <code>&lt;%= 变量 %&gt;</code> 来输出收集的配置，还可以通过 <code>&lt;% if (变量) {%&gt;</code> 判断语句进行选择，具体参考<a href="https://github.com/tomieric/create-lemon-app/preset/template-vue" target="_blank" rel="noopener noreferrer">template-vue</a></p>',12);p.render=function(a,t,p,e,c,l){return s(),n("div",null,[o])};export default p;export{t as __pageData};
