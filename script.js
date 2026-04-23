document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('ahmed-lang') || 'ar';
    let currentCurrencyCode = localStorage.getItem('ahmed-currency') || 'EGP';
    let currentCurrency = siteData.currencies.find(c => c.code === currentCurrencyCode) || siteData.currencies[0];
    let currentTheme = localStorage.getItem('ahmed-theme') || 'dark';
    let currentView = 'cards';

    const currencyDropdownList = document.getElementById('currency-dropdown-list');
    const currencyBtn = document.getElementById('selected-currency-btn');
    const currencyText = document.getElementById('current-currency-text');
    const dropdownOverlay = document.getElementById('dropdown-overlay');
    const themeToggle = document.querySelector('#checkbox');
    const langToggle = document.getElementById('lang-toggle');
    const viewCardsBtn = document.getElementById('view-cards-btn');
    const viewTableBtn = document.getElementById('view-table-btn');
    const viewSummaryBtn = document.getElementById('view-summary-btn');
    const pricingContent = document.getElementById('pricing-content');

    // Theme logic
    if (currentTheme === 'light') {
        themeToggle.checked = true;
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('ahmed-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('ahmed-theme', 'dark');
        }
    });

    // Populate Custom Currency Dropdown
    function renderCurrencyDropdown() {
        const t = siteData.translations[currentLang];
        currencyDropdownList.innerHTML = `<div class="dropdown-header">${t.selectCurrency}</div>`;
        siteData.currencies.forEach(curr => {
            const div = document.createElement('div');
            div.className = 'dropdown-item';
            div.textContent = `${curr.code} (${curr.symbol})`;
            div.addEventListener('click', () => {
                currentCurrency = curr;
                localStorage.setItem('ahmed-currency', curr.code);
                closeDropdown();
                updateUI();
            });
            currencyDropdownList.appendChild(div);
        });
    }

    renderCurrencyDropdown();

    function closeDropdown() {
        currencyDropdownList.classList.remove('active');
        dropdownOverlay.classList.remove('active');
    }

    currencyBtn.addEventListener('click', () => {
        const isActive = currencyDropdownList.classList.toggle('active');
        dropdownOverlay.classList.toggle('active', isActive);
    });

    // Close dropdown on click outside or overlay
    dropdownOverlay.addEventListener('click', closeDropdown);
    document.addEventListener('click', (e) => {
        if (!currencyBtn.contains(e.target) && !currencyDropdownList.contains(e.target) && !dropdownOverlay.contains(e.target)) {
            closeDropdown();
        }
    });

    // Language Toggle logic
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('ahmed-lang', currentLang);
        applyLang();
        updateUI();
    });

    function applyLang() {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        langToggle.textContent = currentLang === 'ar' ? 'English' : 'العربية';
    }

    // View Switcher logic
    viewCardsBtn.addEventListener('click', () => {
        currentView = 'cards';
        viewCardsBtn.classList.add('active');
        viewTableBtn.classList.remove('active');
        updateUI();
    });

    viewTableBtn.addEventListener('click', () => {
        currentView = 'table';
        setActiveBtn(viewTableBtn);
        updateUI();
    });

    viewSummaryBtn.addEventListener('click', () => {
        currentView = 'summary';
        setActiveBtn(viewSummaryBtn);
        updateUI();
    });

    function setActiveBtn(btn) {
        [viewCardsBtn, viewTableBtn, viewSummaryBtn].forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function formatPrice(egpAmount) {
        let converted = egpAmount * currentCurrency.rate;
        // Rounding logic for aesthetics
        if (currentCurrency.code === 'EGP') return Math.round(converted);
        return converted.toFixed(converted < 1 ? 3 : 1);
    }

    function renderCards() {
        const t = siteData.translations[currentLang];
        let html = `<div class="pricing-grid">`;
        
        siteData.packages.forEach(pkg => {
            const setup = formatPrice(pkg.setup_egp);
            const host = formatPrice(pkg.host_egp);
            const total = formatPrice(pkg.setup_egp + pkg.host_egp);

            html += `
                <div class="glass-card ${pkg.popular ? 'popular' : ''}" id="pkg-${pkg.id}">
                    ${pkg.popular ? `<div class="popular-badge">POULAR</div>` : ''}
                    <div class="card-header">
                        <h3>${currentLang === 'ar' ? pkg.name_ar : pkg.name_en}</h3>
                    </div>
                    <div class="price-tag">
                        <span class="amount">${total}</span>
                        <span class="currency">${currentCurrency.symbol}</span>
                        <p style="color: var(--text-dim); font-size: 0.9rem; margin-top: 5px;">${t.totalFirstYear}</p>
                    </div>
                    <ul class="features-list">
                        ${pkg.features.slice(0, 5).map(feat => `
                            <li>
                                <span class="feat-icon ${feat.included ? '' : 'no'}">${feat.included ? '✓' : '✕'}</span>
                                ${currentLang === 'ar' ? feat.ar : feat.en}
                            </li>
                        `).join('')}
                        <li>...</li>
                    </ul>
                    <div class="card-extra-info" style="margin-bottom: 2rem; font-size: 0.85rem; color: var(--text-dim);">
                        <div>${t.setupFee}: ${setup} ${currentCurrency.symbol}</div>
                        <div>${t.annualFee}: ${host} ${currentCurrency.symbol}</div>
                    </div>
                    <a href="https://wa.me/201270041844?text=${encodeURIComponent(`Hello, I am interested in the ${currentLang === 'ar' ? pkg.name_ar : pkg.name_en} package priced at ${total} ${currentCurrency.code}`)}" 
                       target="_blank" class="glass-btn primary" style="width: 100%; justify-content: center;">
                        ${t.getInTouch}
                    </a>
                </div>
            `;
        });
        html += `</div>`;
        pricingContent.innerHTML = html;
    }

    function renderTable() {
        const t = siteData.translations[currentLang];
        let html = `<div class="table-container"><table><thead><tr><th class="feature-name">${t.feature}</th>`;
        
        siteData.packages.forEach(pkg => {
            html += `<th>${currentLang === 'ar' ? pkg.name_ar : pkg.name_en}</th>`;
        });
        html += `</tr></thead><tbody>`;

        // All features logic
        const allFeatures = siteData.packages[2].features; // Use Max package as reference
        allFeatures.forEach((feat, idx) => {
            html += `<tr><td class="feature-name">${currentLang === 'ar' ? feat.ar : feat.en}</td>`;
            siteData.packages.forEach(pkg => {
                const pkgFeat = pkg.features[idx];
                html += `<td><span class="feat-icon ${pkgFeat && pkgFeat.included ? '' : 'no'}">${pkgFeat && pkgFeat.included ? '✓' : '✕'}</span></td>`;
            });
            html += `</tr>`;
        });

        // Pricing Rows
        const pricingRows = [
            { label: t.setupFee, key: 'setup_egp' },
            { label: t.annualFee, key: 'host_egp' },
            { label: t.renewalFee, key: 'host_egp' },
            { label: t.optionalSupport, key: 'support_egp' },
            { label: t.totalFirstYear, key: 'total' }
        ];

        pricingRows.forEach(row => {
            html += `<tr style="background: rgba(255,255,255,0.02)"><td class="feature-name" style="font-weight: bold">${row.label}</td>`;
            siteData.packages.forEach(pkg => {
                let amount = row.key === 'total' ? (pkg.setup_egp + pkg.host_egp) : pkg[row.key];
                html += `<td style="font-weight: bold; color: var(--primary)">${formatPrice(amount)} ${currentCurrency.symbol}</td>`;
            });
            html += `</tr>`;
        });

        html += `</tbody></table></div>`;
        pricingContent.innerHTML = html;
    }

    function renderSummary() {
        const t = siteData.translations[currentLang];
        let html = `<div class="summary-container">`;
        
        siteData.packages.forEach(pkg => {
            const total = formatPrice(pkg.setup_egp + pkg.host_egp);
            html += `
                <div class="summary-item">
                    <div class="summary-info">
                        <h4>${currentLang === 'ar' ? pkg.name_ar : pkg.name_en}</h4>
                        <div class="summary-price">${total} ${currentCurrency.symbol}</div>
                    </div>
                    <div class="summary-actions">
                        <button class="glass-btn secondary sm-btn jump-to-details" data-target="pkg-${pkg.id}">
                            ${t.viewDetails}
                        </button>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        pricingContent.innerHTML = html;

        // Add events to jump buttons
        document.querySelectorAll('.jump-to-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.currentTarget.getAttribute('data-target');
                currentView = 'cards';
                setActiveBtn(viewCardsBtn);
                updateUI();
                // smooth scroll
                setTimeout(() => {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            });
        });
    }

    function updateTexts() {
        const t = siteData.translations[currentLang];
        document.getElementById('hero-title').textContent = t.heroTitle;
        document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
        
        // Update elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });
    }

    function updateUI() {
        applyLang();
        renderCurrencyDropdown();
        currencyText.textContent = currentCurrency.code;
        updateTexts();
        if (currentView === 'cards') {
            renderCards();
        } else if (currentView === 'summary') {
            renderSummary();
        } else {
            renderTable();
        }
    }

    // Initial Load
    updateUI();
});
