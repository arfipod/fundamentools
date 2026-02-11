let currentLang = localStorage.getItem('fundamentalAnalyzerLang') || 'es';

function t(key, fallback = '') {
  return (window.I18N?.[currentLang]?.[key]) || (window.I18N?.en?.[key]) || fallback || key;
}

function applyLocalization() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, el.textContent);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key, el.placeholder || '');
  });
}

function setLanguage(lang) {
  currentLang = (lang === 'en' ? 'en' : 'es');
  localStorage.setItem('fundamentalAnalyzerLang', currentLang);
  applyLocalization();
  const langSel = document.getElementById('langSelect');
  if (langSel) langSel.value = currentLang;
  populateIndustrySelector();
  updateToggleSectionsButton();
}




const FINANCIAL_LABEL_EN_ES = {
  "Revenues": "Ingresos",
  "Total Revenues": "Ingresos totales",
  "% Change YoY": "% De cambio interanual",
  "Cost of Goods Sold": "Coste de los bienes vendidos",
  "Gross Profit": "Beneficio bruto",
  "% Gross Margins": "% Márgenes brutos",
  "Selling General & Admin Expenses": "Gastos de venta generales y administrativos",
  "Depreciation & Amortization": "Depreciación y amortización",
  "Amortization of Goodwill and Intangible Assets": "Amortización de fondos de comercio y activos intangibles",
  "Other Operating Expenses": "Otros gastos operacionales",
  "Total Operating Expenses": "Gastos operativos totales",
  "Operating Income": "Beneficio operativo",
  "% Operating Margins": "% Márgenes operativos",
  "Interest Expense": "Gastos por intereses",
  "Interest And Investment Income": "Ingresos por intereses e inversiones",
  "Currency Exchange Gains (Loss)": "Ganancias (pérdidas) cambiarias",
  "Other Non Operating Income (Expenses)": "Otros ingresos (gastos) no operativos",
  "EBT Excl. Unusual Items": "EBT excl. Artículos inusuales",
  "Merger & Restructuring Charges": "Cargos de fusión y reestructuración",
  "Impairment of Goodwill": "Deterioro del fondo de comercio",
  "Gain (Loss) On Sale Of Investments": "Ganancia (pérdida) por venta de inversiones",
  "Legal Settlements": "Acuerdos legales",
  "Other Unusual Items": "Otros artículos inusuales",
  "EBT Incl. Unusual Items": "EBT incl. Artículos extraordinarios",
  "Income Tax Expense": "Gastos de impuestos",
  "Earnings From Continuing Operations": "Beneficios por operaciones continuadas",
  "Net Income to Company": "Beneficio neto de la empresa",
  "Net Income": "Beneficio neto",
  "Preferred Dividend and Other Adjustments": "Dividendo preferente y otros ajustes",
  "Net Income to Common Incl Extra Items": "Beneficio neto a acciones comunes incluidos extraordinarios",
  "% Net Income to Common Incl Extra Items Margins": "Margen de beneficio neto a acciones comunes incluidos extraordinarios %",
  "Net Income to Common Excl. Extra Items": "Beneficio neto a acciones comunes excluidos extraordinarios",
  "% Net Income to Common Excl. Extra Items Margins": "Margen de beneficio neto a acciones comunes excluidos extraordinarios %",
  "Supplementary Data:": "Datos adicionales:",
  "Diluted EPS Excl Extra Items": "BPA diluido sin extraordinarios",
  "Weighted Average Diluted Shares Outstanding": "Promedio ponderado de acciones diluidas en circulación",
  "Weighted Average Basic Shares Outstanding": "Promedio ponderado de acciones básicas en circulación",
  "Basic EPS": "BPA básico",
  "EBITDA": "EBITDA",
  "EBITDAR": "EBITDAR",
  "Selling and Marketing Expense": "Gastos de venta y marketing",
  "Effective Tax Rate %": "Tasa efectiva de impuestos %",
  "Market Cap": "Capitalización de mercado",
  "Price Close": "Precio de cierre",
  "TEV": "TEV",
  "Cash And Equivalents": "Efectivo y equivalentes",
  "Total Cash And Short Term Investments": "Efectivo total e inversiones a corto plazo",
  "Accounts Receivable": "Cuentas por cobrar",
  "Other Receivables": "Otros por cobrar",
  "Notes Receivable": "Notas por cobrar",
  "Total Receivables": "Total de cuentas por cobrar",
  "Prepaid Expenses": "Gastos pagados por anticipado",
  "Restricted Cash": "Efectivo restringido",
  "Other Current Assets": "Otro activo corriente",
  "Total Current Assets": "Total de activo corriente",
  "Gross Property Plant And Equipment": "Inmovilizado material bruto",
  "Accumulated Depreciation": "Depreciación acumulada",
  "Net Property Plant And Equipment": "Inmovilizado material neto",
  "Goodwill": "Fondo de comercio",
  "Other Intangibles": "Otros intangibles",
  "Deferred Tax Assets Long-Term": "Activos por impuestos diferidos a largo plazo",
  "Deferred Charges Long-Term": "Cargos diferidos a largo plazo",
  "Other Long-Term Assets": "Otros activos a largo plazo",
  "Total Assets": "Activo total",
  "Accounts Payable": "Cuentas por pagar",
  "Accrued Expenses": "Gastos devengados",
  "Short-term Borrowings": "Préstamos de corto plazo",
  "Current Portion of Long-Term Debt": "Porción corriente de la deuda a largo plazo",
  "Current Portion of Capital Lease Obligations": "Porción corriente de las obligaciones de arrendamiento financiero",
  "Unearned Revenue Current": "Ingresos no devengados (corriente)",
  "Other Current Liabilities": "Otros pasivos corrientes",
  "Total Current Liabilities": "Total pasivo corriente",
  "Long-Term Debt": "Deuda a largo plazo",
  "Capital Leases": "Arrendamientos de capitales",
  "Deferred Tax Liability Non Current": "Pasivo por impuesto diferido no corriente",
  "Other Non Current Liabilities": "Otro pasivo no corrientes",
  "Total Liabilities": "Pasivo Total",
  "Common Stock": "Acciones comunes",
  "Additional Paid In Capital": "Prima de suscripción",
  "Retained Earnings": "Beneficio no distribuido",
  "Treasury Stock": "Autocartera",
  "Comprehensive Income and Other": "Resultado integral y otros",
  "Total Common Equity": "Patrimonio neto común total",
  "Total Equity": "Fondos propios totales",
  "Total Liabilities And Equity": "Pasivo total y patrimonio neto",
  "Total Shares Out. on Filing Date": "Total de acciones fuera. en la fecha de presentación",
  "Book Value / Share": "Valor contable / Acción",
  "Tangible Book Value": "Valor contable tangible",
  "Tangible Book Value / Share": "Valor contable tangible / acción",
  "Total Debt": "Deuda total",
  "Net Debt": "Deuda neta",
  "Land": "Terrenos",
  "Buildings": "Edificios",
  "Construction In Progress": "Construcción en progreso",
  "Full Time Employees": "Empleados a tiempo completo",
  "Cash Flow Statement": "Estado de flujo de efectivo",
  "Total Depreciation & Amortization": "Depreciación y amortización total",
  "Amortization of Deferred Charges": "Amortización de cargos diferidos",
  "(Gain) Loss on Sale of Investments": "(Ganancia) Pérdida por venta de inversiones",
  "Asset Writedown & Restructuring Costs": "Deterioro de activos y costes de reestructuración",
  "Stock-Based Compensation": "Compensación de stock options",
  "Other Operating Activities": "Otras actividades operativas",
  "Change In Accounts Receivable": "Cambio en cuentas por cobrar",
  "Change In Accounts Payable": "Cambio en cuentas por pagar",
  "Change in Unearned Revenues": "Cambio en los ingresos no devengados",
  "Change in Other Net Operating Assets": "Variación en otros activos operativos netos",
  "Cash from Operations": "Efectivo de Operaciones",
  "Memo: Change in Net Working Capital": "Nota: Cambio en el capital circulante",
  "Capital Expenditure": "Gastos de capital",
  "Cash Acquisitions": "Adquisiciones con efectivo",
  "Sale (Purchase) of Intangible assets": "Venta (compra) de activos intangibles",
  "Other Investing Activities": "Otras actividades de inversión",
  "Cash from Investing": "Efectivo de la inversión",
  "Total Debt Issued": "Deuda total emitida",
  "Total Debt Repaid": "Total de la deuda reembolsada",
  "Issuance of Common Stock": "Emisión de acciones ordinarias",
  "Repurchase of Common Stock": "Recompra de acciones comunes",
  "Other Financing Activities": "Otras Actividades de Financiamiento",
  "Cash from Financing": "Efectivo de Financiamiento",
  "Foreign Exchange Rate Adjustments": "Ajustes del tipo de cambio de divisas",
  "Net Change in Cash": "Cambio neto en efectivo",
  "Free Cash Flow": "Flujo de caja libre",
  "% Free Cash Flow Margins": "% Márgenes de flujo de caja libre",
  "Cash and Cash Equivalents, Beginning of Period": "Efectivo y equivalentes de efectivo, comienzo del período",
  "Cash and Cash Equivalents, End of Period": "Efectivo y equivalentes de efectivo, fin de período",
  "Cash Interest Paid": "Intereses en efectivo pagados",
  "Cash Taxes Paid": "Impuestos en efectivo pagados",
  "Cash Flow per Share": "Flujo de caja por acción"
};

const FINANCIAL_SYNONYMS = {
  'sga': 'Selling General & Admin Expenses',
  'sg&a': 'Selling General & Admin Expenses',
  'selling general & admin': 'Selling General & Admin Expenses',
  'selling general and admin': 'Selling General & Admin Expenses',
  'selling, general & administrative': 'Selling General & Admin Expenses',
  'selling general & administrative': 'Selling General & Admin Expenses',
  'cash and cash equivalents': 'Cash And Equivalents',
  'capital expenditures': 'Capital Expenditure',
  'capital expenditure': 'Capital Expenditure',
  'unearned revenue current': 'Unearned Revenue Current'
};

const LABEL_NORMALIZATION_FIXES = {
  'inmobilizado': 'inmovilizado',
  'beneficio netos': 'beneficio neto',
  'extradordinarios': 'extraordinarios'
};

function normalizeLabelText(label) {
  if (!label) return '';
  let out = String(label)
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*%\s*/g, ' % ')
    .trim();
  Object.entries(LABEL_NORMALIZATION_FIXES).forEach(([wrong, ok]) => {
    const re = new RegExp(wrong, 'gi');
    out = out.replace(re, ok);
  });
  return out.replace(/\s+/g, ' ').trim();
}

const FINANCIAL_LABEL_NORMALIZED = Object.fromEntries(
  Object.entries(FINANCIAL_LABEL_EN_ES).map(([en, es]) => [normalizeLabelText(en).toLowerCase(), { en, es }])
);

function canonicalizeFinancialLabel(label) {
  const raw = String(label || '');
  const normalized = normalizeLabelText(raw);
  const exact = FINANCIAL_LABEL_NORMALIZED[normalized.toLowerCase()];
  if (exact) return { raw, normalized, canonicalEn: exact.en, es: exact.es, match: 'exact' };

  const syn = FINANCIAL_SYNONYMS[normalized.toLowerCase()];
  if (syn && FINANCIAL_LABEL_EN_ES[syn]) {
    return { raw, normalized, canonicalEn: syn, es: FINANCIAL_LABEL_EN_ES[syn], match: 'synonym' };
  }

  return { raw, normalized, canonicalEn: raw, es: raw, match: 'fallback' };
}

function translateFinancialLabel(label) {
  const c = canonicalizeFinancialLabel(label);
  return currentLang === 'es' ? (c.es || c.raw) : (c.canonicalEn || c.raw);
}

const DYNAMIC_I18N = {
  sectionTitles: {
    'Growth':'Crecimiento',
    'Profitability & Margins':'Rentabilidad y Márgenes',
    'Cost Structure & OpEx':'Estructura de Costes y OpEx',
    'Returns & Economic Moat':'Retornos y Foso Económico',
    'Balance Sheet Composition':'Composición del Balance',
    'Debt & Financial Health':'Deuda y Salud Financiera',
    'Cash Flow Quality':'Calidad del Flujo de Caja',
    'Efficiency & Operations':'Eficiencia y Operaciones',
    'Valuation':'Valoración',
    'Dividends & Shareholder Returns':'Dividendos y Retorno al Accionista',
    'Consensus Estimates':'Estimaciones de Consenso',
    'Analyst Sentiment (Low weight / noisy — ruido)':'Sentimiento de Analistas (bajo peso / ruidoso)',
    'Harmony & Red Flags':'Armonía y Banderas Rojas',
    'Balance Sheet Reality Check':'Chequeo de Realidad del Balance',
    'Cash Flow — The Truth Serum':'Flujo de Caja — Suero de la Verdad'
  },
  metricNames: {
    'Current Ratio':'Ratio Corriente',
    'Quick Ratio':'Ratio Rápido',
    'Revenue Growth (CAGR)':'Crecimiento de Ingresos (CAGR)',
    'Revenue YoY Growth':'Crecimiento interanual de ingresos',
    'EPS Growth (Diluted)':'Crecimiento del BPA (diluido)',
    'EBITDA Growth':'Crecimiento del EBITDA',
    'Operating Income Growth':'Crecimiento del beneficio operativo',
    'Net Income Growth':'Crecimiento del beneficio neto',
    'Free Cash Flow Growth':'Crecimiento del flujo de caja libre',
    'Gross Margin':'Margen bruto',
    'Operating Margin (EBIT)':'Margen operativo (EBIT)',
    'EBITDA Margin':'Margen EBITDA',
    'FCF Margin':'Margen de FCF',
    'Operating Leverage':'Apalancamiento operativo',
    'COGS as % of Revenue':'COGS como % de ingresos',
    'Operating Expenses as % of Gross Profit':'Gastos operativos como % del beneficio bruto',
    'SG&A as % of Revenue':'SG&A como % de ingresos',
    'R&D as % of Revenue':'I+D como % de ingresos',
    'Effective Tax Rate':'Tasa efectiva de impuestos',
    'Interest Expense as % of Revenue':'Gastos por intereses como % de ingresos',
    'Stock-Based Comp as % of Revenue':'Compensación en acciones como % de ingresos',
    'ROIC (Return on Invested Capital)':'ROIC (Retorno sobre Capital Invertido)',
    'ROE (Return on Equity)':'ROE (Retorno sobre Patrimonio)',
    'ROA (Return on Assets)':'ROA (Retorno sobre Activos)',
    'Equity Multiplier (ROE/ROA)':'Multiplicador de patrimonio (ROE/ROA)',
    'Asset Turnover':'Rotación de activos',
    'Receivables Turnover':'Rotación de cuentas por cobrar',
    'Inventory Turnover':'Rotación de inventarios',
    'Cash Conversion Cycle':'Ciclo de conversión de caja',
    'Days Sales Outstanding (DSO)':'Días de ventas pendientes (DSO)',
    'Enterprise Value vs Market Cap':'Enterprise Value vs Capitalización de mercado',
    'Forward P/E (NTM)':'P/E futuro (NTM)',
    'Price / Sales':'Precio / Ventas',
    'Price / Book Value':'Precio / Valor contable',
    'EV/EBITDA (NTM)':'EV/EBITDA (NTM)',
    'EV/EBIT':'EV/EBIT',
    'FCF Yield (NTM)':'Rentabilidad FCF (NTM)',
    'Dividend Yield':'Rentabilidad por dividendo',
    'P/E Context Map (informational)':'Mapa de contexto P/E (informativo)',
    'Dividends Per Share':'Dividendos por acción',
    'Payout Ratio':'Payout ratio',
    'Total Dividends Paid':'Dividendos totales pagados',
    'Share Buybacks':'Recompras de acciones',
    'Share Issuance (Dilution)':'Emisión de acciones (dilución)',
    'Diluted Shares Outstanding':'Acciones diluidas en circulación',
    'Total Shareholder Yield':'Retorno total al accionista',
    'Consensus Revenue Estimate':'Estimación de ingresos de consenso',
    'Consensus EPS Estimate':'Estimación de BPA de consenso',
    'Consensus EBITDA Estimate':'Estimación de EBITDA de consenso',
    'Consensus FCF Estimate':'Estimación de FCF de consenso',
    'Revenue vs Earnings Harmony':'Armonía ingresos vs beneficios',
    'CFO vs Net Income (Accrual Risk)':'CFO vs Beneficio neto (riesgo de devengo)',
    'FCF Consistency Check':'Chequeo de consistencia del FCF',
    'Net Debt / Net Cash':'Deuda neta / Caja neta',
    'Cash / Short-Term Debt':'Caja / Deuda a corto plazo',
    'Receivables Days Trend':'Tendencia de días de cobro',
    'Inventory vs Revenue Growth':'Crecimiento inventario vs ingresos',
    'Goodwill + Intangibles Concentration':'Concentración de fondo de comercio + intangibles',
    'Deferred Revenue Signal':'Señal de ingresos diferidos',
    'FCF Uses Summary':'Resumen de usos del FCF',
    'SBC as % of FCF':'SBC como % del FCF',
    'SBC as % of Net Income':'SBC como % del beneficio neto'
  },
  fragments: {
    'Latest':'Último',
    'Avg':'Promedio',
    'Trend':'Tendencia',
    'Insufficient data':'Datos insuficientes',
    'Strong':'Fuerte',
    'Moderate':'Moderado',
    'Slow':'Lento',
    'Declining':'En descenso',
    'Very Liquid':'Muy líquido',
    'Healthy':'Saludable',
    'OK':'Correcto',
    'Low Liquidity ⚠️':'Liquidez baja ⚠️',
    'Excludes inventory — more conservative than current ratio':'Excluye inventario: más conservador que el ratio corriente',
    'Very Healthy':'Muy saludable',
    'Adequate':'Adecuado',
    'Tight Liquidity ⚠️':'Liquidez ajustada ⚠️',
    'Not enough data':'Datos insuficientes',
    'see details':'ver detalle',
    'Quality':'Calidad',
    'Moat':'Foso',
    'Financial Risk':'Riesgo Financiero',
    'Overall Health':'Salud General',
    'Valuation':'Valoración',
    'Growth':'Crecimiento',
    'Margins':'Márgenes',
    'Costs':'Costes',
    'Balance':'Balance',
    'Debt':'Deuda',
    'Cashflow':'Flujo de caja',
    'Efficiency':'Eficiencia',
    'Shareholder':'Accionista',
    'Harmony':'Armonía',
    'Good':'Bueno',
    'Excellent':'Excelente',
    'Average':'Medio',
    'Poor':'Débil',
    'Volatile':'Volátil',
    'Decent':'Decente',
    'Best-in-class':'Líder de clase',
    'Elite':'Élite',
    'Cash Machine':'Máquina de caja',
    'Some Leverage':'Algo de apalancamiento',
    'Investing in Innovation':'Invirtiendo en innovación',
    'Outstanding':'Sobresaliente',
    'Negative CCC (Uses supplier float!)':'CCC negativo (usa financiación de proveedores)',
    'Context only':'Solo contexto',
    'Never Cut — Reliable':'Nunca recortado — fiable',
    'In line':'En línea',
    'Manageable':'Manejable',
    'Contained':'Contenido',
    'Acceptable':'Aceptable',
    'Aligned Growth':'Crecimiento alineado',
    'Cash-backed earnings':'Beneficios respaldados por caja',
    'Neutral':'Neutral',
    'Covered':'Cubierto',
    'Stable':'Estable',
    'Limited':'Limitado',
    'Fair':'Razonable',
    'Expensive':'Caro',
    'Very Rich':'Muy exigente',
    'Rich':'Exigente',
    'Token Dividend':'Dividendo simbólico',
    'Very Safe':'Muy seguro',
    'Growing Distributions':'Distribuciones crecientes',
    'Active Buybacks':'Recompras activas',
    'Heavy Dilution ⚠️':'Fuerte dilución ⚠️',
    'Shrinking ✓':'Reduciéndose ✓',
    'Excellent Capital Return':'Excelente retorno de capital',
    'annual':'anual',
    '2-minute Quality':'Calidad en 2 minutos',
    '2-minute Moat':'Foso en 2 minutos',
    '2-minute Financial Risk':'Riesgo financiero en 2 minutos',
    '2-minute Valuation':'Valoración en 2 minutos',
    'Return on Equity':'Retorno sobre el patrimonio',
    'Return on Assets':'Retorno sobre activos',
    'Enterprise Value vs Capitalización de mercado':'Valor de empresa (EV) vs capitalización de mercado',
    'Enterprise Value vs Market Cap':'Valor de empresa (EV) vs capitalización de mercado',
    'Revenue vs Earnings Harmony':'Armonía entre ingresos y beneficios',
    'Harmony':'armonía',
    'Revenue':'ingresos',
    'Earnings':'beneficios',
    'Revenue YoY':'Ingresos interanuales (YoY)',
    'Earnings YoY':'Beneficios interanuales (YoY)',
    'Std dev':'desviación estándar',
    'erratic growth':'crecimiento errático',
    'Net Profit Margin':'Margen de beneficio neto',
    'Exceptional':'Excepcional',
    'Stability':'Estabilidad',
    'stable':'estable',
    'up':'al alza',
    'Gross Δ':'Δ (cambio) bruto',
    'Op Δ':'Δ (cambio) operativo',
    'Watch for cost structure issues':'Vigila posibles problemas en la estructura de costes',
    'Operating Expenses as % of Beneficio bruto':'Gastos operativos como % del beneficio bruto',
    'Golden rule: OpEx should not eat most gross profit (gastos operativos controlados).':'Regla de oro: el OpEx no debería comerse la mayor parte del beneficio bruto (gastos operativos controlados).',
    'Controlled':'Controlado',
    'SG&A':'Gastos de venta, generales y administrativos (SG&A)',
    'Lower is better — shows operational efficiency':'Cuanto más bajo, mejor — indica eficiencia operativa',
    'Minimal':'Mínimo',
    'Beware: high leverage can inflate ROE artificially':'Ojo: un apalancamiento alto puede inflar el ROE artificialmente',
    'Equity Multiplier':'Multiplicador del patrimonio (apalancamiento)',
    'Leverage-driven ROE':'ROE impulsado por apalancamiento',
    'Leveraged':'Apalancada / con alto apalancamiento',
    'Private equity stress threshold is typically 4-5x':'El umbral de estrés típico en private equity suele ser 4–5x',
    'Very Low Debt':'Deuda muy baja',
    'Very Low Deuda':'Deuda muy baja',
    'Very Efficient':'Muy eficiente',
    'Excellent Collection':'Excelente gestión de cobros',
    'Negative CCC = the business generates cash before paying suppliers (very powerful)':'CCC negativo = el negocio genera efectivo antes de pagar a proveedores (muy potente)',
    'Buybacks reduce share count and boost EPS':'Las recompras reducen el número de acciones y elevan el BPA (EPS)',
    'Fewer shares = more value per share for existing holders':'Menos acciones = más valor por acción para los accionistas actuales',
    'Buybacks + dividends as % of market cap':'Recompras + dividendos como % de la capitalización bursátil',
    'Aligned Crecimiento':'Crecimiento alineado',
    'Aligned':'Alineado',
    'Healthy conversion':'Conversión saludable',
    'Disciplined':'Disciplinado',
    'Capital allocation context':'Contexto de asignación de capital',
    'Classic heuristic: net margin >10% good, >20% excellent (sector-aware).':'Heurística clásica: margen neto >10% es bueno, >20% es excelente (dependiendo del sector).',
    'Classic heuristic: net margin >10 % good, >20 % excellent (sector-aware).':'Heurística clásica: margen neto >10% es bueno, >20% es excelente (dependiendo del sector).',
    'Gross vs Net Margin':'Margen bruto vs margen neto',
    'Operating Discipline':'Disciplina operativa',
    'If gross margin is stable but operating margin falls, overhead is eating profitability.':'Si el margen bruto se mantiene estable pero cae el margen operativo, los costes fijos/estructura se están comiendo la rentabilidad.',
    'FCF':'flujo de caja libre (FCF)',
    'Revenue trend: up | Earnings trend: stable | FCF trend: stable':'Tendencia de ingresos: al alza | tendencia de beneficios: estable | tendencia de FCF: estable',
    'FCF is the crown jewel: rising profits should eventually show up in free cash flow.':'El FCF es la joya de la corona: si los beneficios suben, debería terminar viéndose en el flujo de caja libre.',
    'Deuda neta / Net Cash':'Deuda neta / caja neta',
    'Net Cash':'caja neta',
    'Frequent large acquisitions increase integration risk':'Adquisiciones grandes y frecuentes aumentan el riesgo de integración',
    'Acquisition-heavy':'Intensiva en adquisiciones',
    'debt paydown':'amortización de deuda',
    'cash build':'aumento/acumulación de caja',
    'buybacks':'recompras',
    'dividends':'dividendos',
    'EPS':'BPA (beneficio por acción)',
    'NI/EPS':'beneficio neto / BPA'
  }
};

function localizeDynamicText(text) {
  if (!text) return text;
  let out = normalizeLabelText(String(text));

  // Financial labels first: exact map, then synonyms, fallback to original.
  Object.entries(FINANCIAL_LABEL_EN_ES).sort((a, b) => b[0].length - a[0].length).forEach(([en, es]) => {
    const re = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    out = out.replace(re, currentLang === 'es' ? es : en);
  });

  if (currentLang !== 'es') return out;

  Object.entries(DYNAMIC_I18N.metricNames).sort((a,b)=>b[0].length-a[0].length).forEach(([en, es]) => { out = out.replaceAll(en, es); });
  Object.entries(DYNAMIC_I18N.sectionTitles).sort((a,b)=>b[0].length-a[0].length).forEach(([en, es]) => { out = out.replaceAll(en, es); });
  Object.entries(DYNAMIC_I18N.fragments).sort((a,b)=>b[0].length-a[0].length).forEach(([en, es]) => { out = out.replaceAll(en, es); });
  return out;
}

// =========================================================
// PARSER — Converts TIKR markdown tables to structured data
// =========================================================
function parseNumber(s) {
  if (!s || typeof s !== 'string') return null;
  s = s.trim();
  if (s === '' || s === '-') return null;
  const isPct = s.includes('%');
  const multMatch = s.match(/([\d.,\s()\-+]+)\s*([BMK])\b/i);
  const suffix = multMatch ? multMatch[2].toUpperCase() : null;
  let neg = false;
  if (s.startsWith('(') && s.endsWith(')')) { neg = true; s = s.slice(1,-1); }
  s = s
    .replace(/[A-Z]{2,3}\$/gi,'')
    .replace(/US\$/gi,'')
    .replace(/[€£¥]/g,'')
    .replace(/\$/g,'')
    .replace(/%/g,'')
    .replace(/x$/i,'')
    .replace(/[BMK]$/i, '')
    .trim();
  if (s === '') return null;
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma > lastDot) {
    s = s.replace(/\./g,'').replace(',','.');
  } else if (lastDot > lastComma) {
    s = s.replace(/,/g,'');
  } else {
    s = s.replace(/,/g,'');
  }
  const val = parseFloat(s);
  if (isNaN(val)) return null;
  const multiplier = suffix === 'B' ? 1e9 : suffix === 'M' ? 1e6 : suffix === 'K' ? 1e3 : 1;
  const finalVal = val * multiplier;
  return neg ? -finalVal : finalVal;
}


function splitMarkdownRow(row) {
  // Protect escaped pipes (\\|) so we only split on real column separators.
  const sentinel = '\u241F';
  const protectedRow = row.replace(/\\\|/g, sentinel);

  const cells = protectedRow
    .split('|')
    .map(c => c.replaceAll(sentinel, '|').trim());

  // remove leading/trailing empty cell due to leading/trailing pipe
  return cells.filter((c, i) => i > 0 && i < cells.length - 1);
}
function parseTIKR(raw) {
  const lines = raw.split('\n').map(l => l.trim()).filter(l => l);
  const data = { ticker: '', company: '', price: null, priceNum: null, extractDate: '', period: '', sections: {} };
  const firstLineRaw = (lines[0] || '').replace(/^#+\s*/, '').trim();

  let ticker = '';
  let company = '';

  // Case A: "VEEV – Company Name"
  let m = firstLineRaw.match(/^([A-Z0-9.]+)\s*[–—-]\s*(.+)$/);

  // Case B: "– VEEV US$188.29 ..."
  if (!m) m = firstLineRaw.match(/^[–—-]\s*([A-Z0-9.]+)\b\s*(.*)$/);

  if (m) {
    ticker = (m[1] || '').trim();
    company = (m[2] || '').trim();
  } else {
    // last fallback: first "ticker-like" token
    const t = firstLineRaw.match(/\b[A-Z]{1,10}(?:\.[A-Z]{1,5})?\b/);
    if (t) ticker = t[0];
  }

  data.ticker = ticker;
  data.company = company || data.company || firstLineRaw;


  for (const l of lines) {
    const pm = l.match(/Price:\s*(US\$[\d.,]+)/);
    if (pm) { data.price = pm[1]; data.priceNum = parseNumber(pm[1]); }
    const dm = l.match(/Extracted:\s*(.+)/);
    if (dm) data.extractDate = dm[1];
    const prm = l.match(/Period:\s*(\w+)/);
    if (prm) data.period = prm[1];
  }

  // Try to capture price from the headline if "Price:" line doesn't contain it
  if (!data.price) {
    const p = firstLineRaw.match(/US\$\s*[\d.,]+/);
    if (p) {
      data.price = p[0].replace(/\s+/g, '');  // "US$188.29"
      data.priceNum = parseNumber(p[0]);
    }
  }

  const sectionNames = [
    'Income Statement', 'Balance Sheet', 'Cash Flow', 'Ratios',
    'Valuation Multiples', 'Analyst Price Targets', 'Consensus Estimates'
  ];
  let currentSection = null;
  let sectionLines = {};
  for (const l of lines) {
    const cleaned = l.replace(/^#+\s*/, '');
    const matchedSection = sectionNames.find(n => cleaned === n || cleaned.startsWith(n));
    if (matchedSection) {
      currentSection = matchedSection;
      sectionLines[currentSection] = [];
      continue;
    }
    if (currentSection && l.startsWith('|')) {
      sectionLines[currentSection].push(l);
    }
  }

  for (const [secName, rows] of Object.entries(sectionLines)) {
    const parsed = [];
    let dates = [];
    for (const row of rows) {
      const cells = splitMarkdownRow(row);
      if (cells.length < 2) continue;
      if (cells[0] === '---' || cells.every(c => c === '---' || c === '')) continue;
      const rawLabel = normalizeLabelText(cells[0]);
      if ((rawLabel.includes('TIKR') || rawLabel.includes('Cuenta') || rawLabel.includes('Balance') ||
           rawLabel.includes('Cash Flow') || rawLabel.includes('Ratios') || rawLabel.includes('Múltiplos') ||
           rawLabel.includes('Objetivos') || rawLabel.includes('Estimaciones')) && cells.some(c => c.match(/\d{2}\/\d{2}\/\d{2}/))) {
        dates = cells.slice(1).map(c => c.replace('TIKR.com','').trim());
        continue;
      }
      if (rawLabel === 'TIKR.com' || rawLabel === '---') continue;
      const cLabel = canonicalizeFinancialLabel(rawLabel);
      const values = cells.slice(1);
      parsed.push({ label: cLabel.canonicalEn, rawLabel, displayLabel: cLabel.es, labelNormalized: cLabel.normalized, values, dates });
    }
    data.sections[secName] = { dates, rows: parsed };
  }
  return data;
}

// =========================================================
// ANALYSIS ENGINE — COMPREHENSIVE HEURISTICS
// =========================================================
function getRecentValues(row, n = 5) {
  if (!row) return [];
  const mapped = row.values.map((v, i) => ({ value: parseNumber(v), label: row.dates?.[i] || '' })).filter(x => x.value !== null);
  const sliced = mapped.slice(-n);
  const vals = sliced.map(x => x.value);
  vals.labels = sliced.map(x => x.label);
  return vals;
}

function getLatest(row) {
  if (!row) return null;
  const vals = row.values.map(v => parseNumber(v)).filter(v => v !== null);
  return vals.length > 0 ? vals[vals.length - 1] : null;
}

function getPrevious(row) {
  if (!row) return null;
  const vals = row.values.map(v => parseNumber(v)).filter(v => v !== null);
  return vals.length > 1 ? vals[vals.length - 2] : null;
}

function getTrend(vals) {
  if (!vals || vals.length < 2) return 'neutral';
  let ups = 0, downs = 0;
  for (let i = 1; i < vals.length; i++) {
    if (vals[i] > vals[i-1]) ups++;
    else if (vals[i] < vals[i-1]) downs++;
  }
  if (ups > downs + 1) return 'up';
  if (downs > ups + 1) return 'down';
  return 'stable';
}

function cagr(first, last, years) {
  if (!first || !last || first <= 0 || last <= 0 || years <= 0) return null;
  return (Math.pow(last / first, 1 / years) - 1) * 100;
}

function avg(arr) {
  const valid = arr.filter(v => v !== null && !isNaN(v));
  return valid.length ? valid.reduce((a,b) => a+b, 0) / valid.length : null;
}

function stddev(arr) {
  const valid = arr.filter(v => v !== null && !isNaN(v));
  if (valid.length < 2) return null;
  const m = avg(valid);
  return Math.sqrt(valid.reduce((s, v) => s + (v - m) ** 2, 0) / (valid.length - 1));
}

function yoyGrowth(vals) {
  if (!vals || vals.length < 2) return [];
  return vals.slice(1).map((v, i) => {
    const prev = vals[i];
    if (!prev || prev === 0) return null;
    return ((v - prev) / Math.abs(prev)) * 100;
  });
}

function median(arr) {
  const valid = arr.filter(v => v !== null && !isNaN(v)).sort((a, b) => a - b);
  if (!valid.length) return null;
  return valid[Math.floor(valid.length / 2)];
}

function safeGrowthScore(vals) {
  const v = (vals || []).filter(x => x !== null && !isNaN(x));
  if (v.length < 3) return { kind: 'na', value: null };
  const first = v[0];
  const latest = v[v.length - 1];
  const allPos = v.every(x => x > 0);
  if (allPos) {
    return { kind: 'cagr', value: cagr(first, latest, v.length - 1) };
  }
  return { kind: 'median_yoy', value: median(yoyGrowth(v)) };
}

function getConfidence(vals) {
  const total = (vals || []).length;
  if (total === 0) return 0.25;
  const valid = vals.filter(v => v !== null && !isNaN(v)).length;
  return Math.min(1, Math.max(0.25, valid / Math.max(3, total)));
}

const PROFILE_THRESHOLDS = {
  gross_margin: {
    default: { bull: 40, neutral: 25 }, saas: { bull: 70, neutral: 55 }, retail: { bull: 30, neutral: 18 }, industrial: { bull: 35, neutral: 20 }, financial: { bull: 35, neutral: 20 }, utility: { bull: 35, neutral: 22 }
  },
  roic: {
    default: { bull: 20, neutral: 10 }, saas: { bull: 18, neutral: 10 }, retail: { bull: 14, neutral: 8 }, industrial: { bull: 15, neutral: 8 }, financial: { bull: 12, neutral: 6 }, utility: { bull: 10, neutral: 6 }
  },
  ev_ebitda: {
    default: { bull: 12, neutral: 20 }, saas: { bull: 20, neutral: 30 }, retail: { bull: 10, neutral: 16 }, industrial: { bull: 11, neutral: 17 }, financial: { bull: 14, neutral: 22 }, utility: { bull: 11, neutral: 16 }
  },
  opex_gp: {
    default: { bull: 60, neutral: 75 }, saas: { bull: 62, neutral: 78 }, retail: { bull: 55, neutral: 70 }, industrial: { bull: 60, neutral: 75 }, financial: { bull: 68, neutral: 80 }, utility: { bull: 58, neutral: 72 }
  }
};

function metricThreshold(metric, profile, kind) {
  const node = PROFILE_THRESHOLDS[metric] || {};
  const scope = node[profile] || node.default || {};
  return scope[kind];
}

function inferProfile(snapshot = {}) {
  let score = { saas: 0, retail: 0, industrial: 0, utility: 0, financial: 0, default: 0 };
  if (snapshot.grossMargin !== null) {
    if (snapshot.grossMargin >= 60) score.saas += 2;
    if (snapshot.grossMargin <= 30) { score.retail += 1; score.industrial += 1; }
  }
  if (snapshot.inventoryToAssets !== null && snapshot.inventoryToAssets > 8) score.retail += 2;
  if (snapshot.capexSales !== null) {
    if (snapshot.capexSales > 8) { score.industrial += 2; score.utility += 1; }
    if (snapshot.capexSales < 4) score.saas += 1;
  }
  if (snapshot.netDebtEbitda !== null && snapshot.netDebtEbitda > 3) score.utility += 1;
  const sorted = Object.entries(score).sort((a,b)=>b[1]-a[1]);
  const [winner, pts] = sorted[0] || ['default', 0];
  const secondPts = sorted[1]?.[1] || 0;
  return { profile: pts >= 2 && pts - secondPts >= 1 ? winner : 'default', confidence: Math.min(1, pts/4) };
}

function parseCustomProfile() {
  const txt = document.getElementById('customProfileInput')?.value?.trim();
  if (!txt) return null;
  try {
    const cfg = JSON.parse(txt);
    return cfg && typeof cfg === 'object' ? cfg : null;
  } catch {
    return null;
  }
}

// Helper to create a standard analysis item
const METRIC_TIPS = {
  harmony: 'Harmony (armonía): statements agree on growth, profitability, and cash quality.',
  grossMargin: 'Gross Margin (margen bruto): % of revenue left after COGS.',
  netMargin: 'Net Margin (margen neto): % of revenue kept as net income.',
  moat: 'Moat (foso competitivo): durable advantage protecting profits.',
  dilution: 'Dilution (dilución): more shares reduce ownership per share.',
  accruals: 'Accruals (devengos): accounting profit not yet backed by cash.',
  fcf: 'Free Cash Flow (flujo de caja libre): CFO minus capex.',
  sbc: 'Stock-based comp (compensación en acciones): non-cash now, real dilution later.',
  netDebt: 'Net Debt (deuda neta): debt minus cash and short-term investments.',
  deferredRevenue: 'Deferred revenue (ingresos diferidos): cash collected before service delivery.'
};


function deriveScoreRule(name, detail, signalText, explanation) {
  const n = String(name || '').toLowerCase();
  if (n.includes('current ratio')) return "signal = latest > 1.5 ? 'bull' : latest > 1.0 ? 'neutral' : 'bear'; label = latest > 2.0 ? 'Very Healthy' : latest > 1.5 ? 'Healthy' : latest > 1.0 ? 'Adequate' : 'Tight Liquidity ⚠️'";
  if (n.includes('quick ratio')) return "signal = latest > 1.2 ? 'bull' : latest > 0.8 ? 'neutral' : 'bear'; label = latest > 1.5 ? 'Very Liquid' : latest > 1.2 ? 'Healthy' : latest > 0.8 ? 'OK' : 'Low Liquidity ⚠️'; excludes inventory";
  if (n.includes('debt / equity')) return "signal = latest < 30 ? 'bull' : latest < 80 ? 'neutral' : 'bear'";
  if (n.includes('net debt / ebitda')) return "signal = latest < 0 ? 'bull' : latest < 2 ? 'neutral' : 'bear'";
  if (n.includes('revenue growth (cagr)')) return "signal = cagr > 15 ? 'bull' : cagr > 8 ? 'neutral' : 'bear'";
  if (n.includes('roic')) return "signal = latest > bull_threshold ? 'bull' : latest > neutral_threshold ? 'neutral' : 'bear'";
  if (n.includes('total equity')) return "signal = latest > 0 && trend==='up' ? 'bull' : latest > 0 ? 'neutral' : 'bear'";
  return explanation || detail || signalText || '';
}

function makeItem(name, detail, vals, signal, signalText, explanation, meta = {}) {
  return {
    name,
    detail: detail || '',
    values: vals || [],
    signal: signal || 'neutral',
    signalText: signalText || '',
    explanation: explanation || '',
    tip: meta.tip || '',
    highConfidence: meta.highConfidence !== false,
    confidence: getConfidence(vals || []),
    labels: meta.labels || vals?.labels || [],
    scoreRule: meta.scoreRule || deriveScoreRule(name, detail, signalText, explanation)
  };
}

function analyze(data, profile = 'default', options = {}) {
  const results = { scores: {}, sections: [], meta: { highConfidence: [], lowConfidence: [] } };
  const is = data.sections['Income Statement'];
  const bs = data.sections['Balance Sheet'];
  const cf = data.sections['Cash Flow'];
  const ratios = data.sections['Ratios'];
  const vm = data.sections['Valuation Multiples'];
  const apt = data.sections['Analyst Price Targets'];
  const ce = data.sections['Consensus Estimates'];
  let activeProfile = profile;
  let customThresholds = options.customThresholds || null;

  function mt(metric, kind) {
    if (customThresholds && customThresholds[metric] && typeof customThresholds[metric][kind] === 'number') {
      return customThresholds[metric][kind];
    }
    return metricThreshold(metric, activeProfile, kind);
  }

  // Helper to find row by partial label match (case-insensitive, multi-keyword)
  function findRow(section, ...keywords) {
    if (!section) return null;
    return section.rows.find(r => {
      const l = [r.label, r.rawLabel, r.displayLabel, r.labelNormalized].filter(Boolean).join(' | ').toLowerCase();
      const matches = keywords.every(k => l.includes(k.toLowerCase()));
      if (!matches) return false;
      return r.values.some(v => parseNumber(v) !== null);
    });
  }

  // Find row trying multiple keyword sets
  function findRowAny(section, ...keywordSets) {
    for (const kw of keywordSets) {
      const row = Array.isArray(kw) ? findRow(section, ...kw) : findRow(section, kw);
      if (row) return row;
    }
    return null;
  }

  function findRowExact(section, ...labels) {
    if (!section) return null;
    const normalized = labels.map(l => l.toLowerCase().trim());
    return section.rows.find(r => {
      const l = r.label.toLowerCase().trim();
      return normalized.includes(l) && r.values.some(v => parseNumber(v) !== null);
    }) || null;
  }

  function sumLatestRows(section, ...keywordSets) {
    if (!section) return null;
    const rows = [];
    for (const kw of keywordSets) {
      const row = Array.isArray(kw) ? findRow(section, ...kw) : findRow(section, kw);
      if (row && !rows.includes(row)) rows.push(row);
    }
    if (!rows.length) return null;
    let total = 0;
    let found = false;
    for (const row of rows) {
      const val = getLatest(row);
      if (val !== null) {
        total += Math.abs(val);
        found = true;
      }
    }
    return found ? total : null;
  }

  // Pre-detect core rows with broader synonyms for robust parsing
  const revenueRow = findRowAny(is, 'Ingresos totales', 'Total Revenue', 'Total Revenues', 'Revenue As Reported', 'Revenues', 'Sales', 'Ventas');
  const grossProfitRow = findRowAny(is, 'Gross Profit', 'Beneficio bruto', 'Ganancia bruta');
  const opIncomeRowCore = findRowAny(is, 'Operating Income', 'EBIT', 'Ingresos de explotación', 'Resultado operativo');
  const netIncomeRowCore = findRowAny(is, 'Net Income', 'Net earnings', 'Beneficio neto', 'Resultado neto');
  const grossMarginRowCore = findRowAny(ratios, 'Gross Margin', 'Margen de beneficio bruto', 'Margen bruto');
  const capexCore = findRowAny(cf, 'Capital Expenditures', 'CapEx', 'Gastos de capital', 'Inversiones en capital');
  const debtCore = findRowAny(bs, 'Total Debt', 'Deuda total');
  const invCore = findRowAny(bs, 'Inventory', 'Inventories', 'Inventarios');
  const assetsCore = findRowAny(bs, 'Total Assets', 'Activos totales');

  if (profile === 'auto') {
    const gm = getLatest(grossMarginRowCore);
    const capexSales = (getLatest(capexCore) !== null && getLatest(revenueRow) ? Math.abs(getLatest(capexCore)) / getLatest(revenueRow) * 100 : null);
    const invPctAssets = (getLatest(invCore) !== null && getLatest(assetsCore) ? Math.abs(getLatest(invCore)) / getLatest(assetsCore) * 100 : null);
    const ndE = null;
    const inferred = inferProfile({ grossMargin: gm, capexSales, inventoryToAssets: invPctAssets, netDebtEbitda: ndE });
    activeProfile = inferred.profile;
    results.profileInference = inferred;
  }

  // ══════════════════════════════════════════════════════════
  // 1. REVENUE & GROWTH ANALYSIS
  // ══════════════════════════════════════════════════════════
  const growthItems = [];

  if (revenueRow) {
    const vals = getRecentValues(revenueRow, 10);
    const latest = vals[vals.length - 1];
    const five = vals.length >= 6 ? vals[vals.length - 6] : vals[0];
    const years = vals.length >= 6 ? 5 : vals.length - 1;
    const gr = cagr(five, latest, years);
    growthItems.push(makeItem(
      'Revenue Growth (CAGR)',
      gr !== null ? `${years}Y CAGR: ${gr.toFixed(1)}%` : 'Insufficient data',
      vals,
      gr > 15 ? 'bull' : gr > 8 ? 'neutral' : 'bear',
      gr > 15 ? 'Strong' : gr > 8 ? 'Moderate' : gr > 0 ? 'Slow' : 'Declining',
      `Revenue: ${five?.toFixed(0)} → ${latest?.toFixed(0)}`
    ));

    // YoY revenue growth consistency
    const yoyGr = yoyGrowth(vals);
    const validYoy = yoyGr.filter(v => v !== null);
    if (validYoy.length >= 3) {
      const latestYoy = validYoy[validYoy.length - 1];
      const avgYoy = avg(validYoy);
      const sd = stddev(validYoy);
      const consistent = sd !== null && sd < 10;
      growthItems.push(makeItem(
        'Revenue YoY Growth',
        `Latest YoY: ${latestYoy?.toFixed(1)}% | Avg: ${avgYoy?.toFixed(1)}%`,
        validYoy,
        latestYoy > 10 ? 'bull' : latestYoy > 3 ? 'neutral' : 'bear',
        consistent ? 'Consistent' : 'Volatile',
        sd !== null ? `Std dev: ${sd.toFixed(1)}pp — ${consistent ? 'predictable' : 'erratic'} growth` : ''
      ));
    }
  }

  const epsRow = findRowAny(is, 'Diluted EPS', ['BPA', 'Diluido'], 'EPS Diluted');
  if (epsRow) {
    const vals = getRecentValues(epsRow, 10);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    const years = vals.length - 1;
    const growth = safeGrowthScore(vals);
    const gr = growth.value;
    growthItems.push(makeItem(
      'EPS Growth (Diluted)',
      gr !== null ? `${growth.kind === 'cagr' ? `${years}Y CAGR` : 'Median YoY'}: ${gr.toFixed(1)}%` : 'N/A',
      vals,
      gr > 15 ? 'bull' : gr > 8 ? 'neutral' : 'bear',
      gr > 15 ? 'Excellent' : gr > 8 ? 'Good' : 'Weak'
    ));
  }

  // EPS Basic for comparison
  const epsBasicRow = findRowAny(is, ['BPA', 'Básico'], 'Basic EPS', 'EPS Basic');
  if (epsBasicRow && epsRow) {
    const diluted = getLatest(epsRow);
    const basic = getLatest(epsBasicRow);
    if (diluted && basic && basic !== 0) {
      const dilutionPct = ((basic - diluted) / basic) * 100;
      if (dilutionPct > 3) {
        growthItems.push(makeItem(
          'Dilution Impact (Basic vs Diluted EPS)',
          `Basic: ${basic.toFixed(2)} vs Diluted: ${diluted.toFixed(2)} (${dilutionPct.toFixed(1)}% dilution)`,
          [],
          dilutionPct < 3 ? 'bull' : dilutionPct < 8 ? 'neutral' : 'bear',
          dilutionPct < 3 ? 'Minimal Dilution' : dilutionPct < 8 ? 'Moderate' : 'Heavy Dilution'
        ));
      }
    }
  }

  const ebitdaRow = findRowAny(is, 'Normalized EBITDA', 'EBITDA');
  if (ebitdaRow) {
    const vals = getRecentValues(ebitdaRow, 10);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    const gr = cagr(first, latest, vals.length - 1);
    growthItems.push(makeItem(
      'EBITDA Growth',
      gr !== null ? `CAGR: ${gr.toFixed(1)}%` : 'N/A',
      vals,
      gr > 12 ? 'bull' : gr > 5 ? 'neutral' : 'bear',
      gr > 12 ? 'Strong' : gr > 5 ? 'Moderate' : 'Weak'
    ));
  }

  const opIncRow = findRowAny(is, 'Ingresos de explotación', 'Operating Income');
  if (opIncRow) {
    const vals = getRecentValues(opIncRow, 10);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    const growth = safeGrowthScore(vals);
    const gr = growth.value;
    growthItems.push(makeItem(
      'Operating Income Growth',
      gr !== null ? `${growth.kind === 'cagr' ? 'CAGR' : 'Median YoY'}: ${gr.toFixed(1)}%` : 'N/A',
      vals,
      gr > 12 ? 'bull' : gr > 5 ? 'neutral' : 'bear',
      gr > 12 ? 'Strong' : gr > 5 ? 'Moderate' : 'Weak'
    ));
  }

  const netIncRow = findRowAny(is, 'Beneficio neto', 'Net Income');
  if (netIncRow) {
    const vals = getRecentValues(netIncRow, 10);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    const growth = safeGrowthScore(vals);
    const gr = growth.value;
    growthItems.push(makeItem(
      'Net Income Growth',
      gr !== null ? `${growth.kind === 'cagr' ? 'CAGR' : 'Median YoY'}: ${gr.toFixed(1)}%` : 'N/A',
      vals,
      gr > 12 ? 'bull' : gr > 5 ? 'neutral' : 'bear',
      gr > 12 ? 'Strong' : gr > 5 ? 'Moderate' : 'Weak'
    ));
  }

  const fcfRow = findRowAny(cf, 'Flujo de caja libre', 'Free Cash Flow');
  if (fcfRow) {
    const vals = getRecentValues(fcfRow, 10);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    const growth = safeGrowthScore(vals);
    const gr = growth.value;
    growthItems.push(makeItem(
      'Free Cash Flow Growth',
      gr !== null ? `${growth.kind === 'cagr' ? 'CAGR' : 'Median YoY'}: ${gr.toFixed(1)}%` : 'N/A',
      vals,
      gr > 12 ? 'bull' : gr > 5 ? 'neutral' : 'bear',
      gr > 12 ? 'Strong' : gr > 5 ? 'Decent' : 'Weak'
    ));
  }

  if (growthItems.length) {
    const bullCount = growthItems.filter(i => i.signal === 'bull').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bullCount >= 1 ? 'average' : 'poor';
    results.scores.growth = grade;
    results.sections.push({ id: 'growth', title: 'Growth', icon: '📈', grade, items: growthItems });
  }

  // ══════════════════════════════════════════════════════════
  // 2. PROFITABILITY & MARGINS
  // ══════════════════════════════════════════════════════════
  const marginItems = [];

  const grossRow = findRowAny(
    is,
    ['gross', 'margin'],
    ['margen', 'bruto'],
    'Gross Margin',
    '% Gross'
  );
  const grossRowR = findRowAny(ratios, 'Margen de beneficio bruto', 'Gross Margin');
  const grossSrc = grossRow || grossRowR;
  if (grossSrc) {
    const vals = getRecentValues(grossSrc, 10);
    const latest = vals[vals.length - 1];
    const trend = getTrend(vals);
    const sd = stddev(vals);
    marginItems.push(makeItem(
      'Gross Margin',
      `Latest: ${latest?.toFixed(1)}% — Trend: ${trend}`,
      vals,
      latest > mt('gross_margin', 'bull') ? 'bull' : latest > mt('gross_margin', 'neutral') ? 'neutral' : 'bear',
      latest > mt('gross_margin', 'bull') + 10 ? 'Wide Moat' : latest > mt('gross_margin', 'bull') ? 'Strong' : latest > mt('gross_margin', 'neutral') ? 'Decent' : 'Thin',
      sd !== null ? `Stability: σ=${sd.toFixed(1)}pp (${sd < 3 ? 'very stable' : sd < 6 ? 'stable' : 'volatile'})` : ''
    ));
  }

  const opRow = findRowAny(
    is,
    ['operating', 'margin'],
    ['margen', 'operativo'],
    'Operating Margin',
    '% Operating'
  );
  const opRowR = findRowAny(ratios, 'Margen EBIT', 'Operating Margin');
  const opSrc = opRow || opRowR;
  if (opSrc) {
    const vals = getRecentValues(opSrc, 10);
    const latest = vals[vals.length - 1];
    const trend = getTrend(vals);
    marginItems.push(makeItem(
      'Operating Margin (EBIT)',
      `Latest: ${latest?.toFixed(1)}% — Trend: ${trend}`,
      vals,
      latest > 20 ? 'bull' : latest > 10 ? 'neutral' : 'bear',
      latest > 25 ? 'Best-in-class' : latest > 20 ? 'Excellent' : latest > 10 ? 'Healthy' : 'Compressed'
    ));
  }

  const ebitdaMarginRow = findRowAny(ratios, 'Margen EBITDA', 'EBITDA Margin');
  if (ebitdaMarginRow) {
    const vals = getRecentValues(ebitdaMarginRow, 10);
    const latest = vals[vals.length - 1];
    marginItems.push(makeItem(
      'EBITDA Margin',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 25 ? 'bull' : latest > 15 ? 'neutral' : 'bear',
      latest > 30 ? 'Elite' : latest > 25 ? 'Strong' : latest > 15 ? 'Fair' : 'Low'
    ));
  }

  const netMRow = findRowAny(is, 'márgenes de beneficio neto');
  const netMRowR = findRowAny(ratios, 'Margen neto', 'Net Margin');
  const netMSrc = netMRow || netMRowR;
  if (netMSrc) {
    const vals = getRecentValues(netMSrc, 10);
    const latest = vals[vals.length - 1];
    marginItems.push(makeItem(
      'Net Profit Margin',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 15 ? 'bull' : latest > 8 ? 'neutral' : 'bear',
      latest > 20 ? 'Exceptional' : latest > 15 ? 'High Quality' : latest > 8 ? 'OK' : 'Low'
    ));
  }

  const fcfMarginRow = findRowAny(cf, 'Free Cash Flow Margin');
  const fcfMarginRowR = findRowAny(ratios, 'Free Cash Flow Margin', 'FCF Margin');
  const fcfMSrc = fcfMarginRow || fcfMarginRowR;
  if (fcfMSrc) {
    const vals = getRecentValues(fcfMSrc, 10);
    const latest = vals[vals.length - 1];
    marginItems.push(makeItem(
      'FCF Margin',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 20 ? 'bull' : latest > 10 ? 'neutral' : 'bear',
      latest > 25 ? 'Cash Machine' : latest > 20 ? 'Excellent' : latest > 10 ? 'Solid' : 'Weak'
    ));
  }

  // Margin expansion check: operating margin expanding vs gross?
  if (grossSrc && opSrc) {
    const grossVals = getRecentValues(grossSrc, 6);
    const opVals = getRecentValues(opSrc, 6);
    if (grossVals.length >= 3 && opVals.length >= 3) {
      const grossDelta = grossVals[grossVals.length - 1] - grossVals[0];
      const opDelta = opVals[opVals.length - 1] - opVals[0];
      const expanding = opDelta > 0 && opDelta >= grossDelta;
      marginItems.push(makeItem(
        'Operating Leverage',
        `Gross Δ: ${grossDelta > 0 ? '+' : ''}${grossDelta.toFixed(1)}pp | Op Δ: ${opDelta > 0 ? '+' : ''}${opDelta.toFixed(1)}pp`,
        [],
        expanding ? 'bull' : opDelta > 0 ? 'neutral' : 'bear',
        expanding ? 'Positive Leverage' : opDelta > 0 ? 'Some Leverage' : 'Margin Compression',
        expanding ? 'Operating margins expanding faster than gross → scaling well' : 'Watch for cost structure issues'
      ));
    }
  }

  if (marginItems.length) {
    const bullCount = marginItems.filter(i => i.signal === 'bull').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bullCount >= 1 ? 'average' : 'poor';
    results.scores.margins = grade;
    results.sections.push({ id: 'margins', title: 'Profitability & Margins', icon: '💰', grade, items: marginItems });
  }

  // ══════════════════════════════════════════════════════════
  // 3. COST STRUCTURE & OPEX ANALYSIS
  // ══════════════════════════════════════════════════════════
  const costItems = [];

  // COGS analysis
  const cogsRow = findRowAny(is, 'Coste de los ingresos', 'Cost of Goods Sold', 'COGS');
  if (cogsRow && revenueRow) {
    const cogsVals = getRecentValues(cogsRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (cogsVals.length >= 2 && revVals.length >= 2) {
      const latestPct = (Math.abs(cogsVals[cogsVals.length - 1]) / Math.abs(revVals[revVals.length - 1])) * 100;
      const firstPct = (Math.abs(cogsVals[0]) / Math.abs(revVals[0])) * 100;
      const delta = latestPct - firstPct;
      costItems.push(makeItem(
        'COGS as % of Revenue',
        `Latest: ${latestPct.toFixed(1)}% (Δ ${delta > 0 ? '+' : ''}${delta.toFixed(1)}pp)`,
        cogsVals,
        delta < -2 ? 'bull' : delta < 2 ? 'neutral' : 'bear',
        delta < -2 ? 'Improving' : delta < 2 ? 'Stable' : 'Rising Costs'
      ));
    }
  }

  // Operating Expenses as % of Gross Profit (golden rule)
  const opExRow = findRowExact(is, 'Total Operating Expenses', 'Gastos operativos totales') || findRowAny(is, ['total', 'operating', 'expenses'], 'Gastos operativos');
  const opIncomeGolden = opIncomeRowCore;
  if ((grossProfitRow && opIncomeGolden) || (opExRow && grossProfitRow)) {
    const gp = getLatest(grossProfitRow);
    const opEx = opExRow ? Math.abs(getLatest(opExRow) || 0) : (gp !== null && getLatest(opIncomeGolden) !== null ? Math.abs(gp - getLatest(opIncomeGolden)) : null);
    if (gp > 0 && opEx !== null) {
      const ratio = opEx / gp * 100;
      costItems.push(makeItem(
        'Operating Expenses as % of Gross Profit',
        `OpEx/Gross Profit: ${ratio.toFixed(1)}%`,
        [ratio],
        ratio <= mt('opex_gp','bull') ? 'bull' : ratio <= mt('opex_gp','neutral') ? 'neutral' : 'bear',
        ratio <= mt('opex_gp','bull') ? 'Controlled' : ratio <= mt('opex_gp','neutral') ? 'Watchlist' : 'Gross profit consumed',
        'Golden rule: OpEx should not eat most gross profit (gastos operativos controlados).'
      ));
    }
  }

  // SG&A analysis
  const sgaRow = findRowAny(
    is,
    'Gastos de venta',
    'SG&A',
    ['selling', 'general', 'admin']
  );
  if (sgaRow && revenueRow) {
    const sgaVals = getRecentValues(sgaRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (sgaVals.length >= 2 && revVals.length >= 2) {
      const latestPct = (Math.abs(sgaVals[sgaVals.length - 1]) / revVals[revVals.length - 1]) * 100;
      const firstPct = (Math.abs(sgaVals[0]) / revVals[0]) * 100;
      const delta = latestPct - firstPct;
      costItems.push(makeItem(
        'SG&A as % of Revenue',
        `Latest: ${latestPct.toFixed(1)}% (Δ ${delta > 0 ? '+' : ''}${delta.toFixed(1)}pp)`,
        sgaVals.map(v => Math.abs(v)),
        delta < -1 ? 'bull' : latestPct < 25 ? 'neutral' : 'bear',
        delta < -1 ? 'Improving Efficiency' : latestPct < 25 ? 'Controlled' : 'High Overhead',
        'Lower is better — shows operational efficiency'
      ));
    }
  }

  // R&D analysis
  const rdRow = findRowAny(
    is,
    'Gastos de investigación',
    'Research and Development',
    'R&D',
    ['r&d', 'expense']
  );
  if (rdRow && revenueRow) {
    const rdVals = getRecentValues(rdRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (rdVals.length >= 2 && revVals.length >= 2) {
      const latestPct = (Math.abs(rdVals[rdVals.length - 1]) / revVals[revVals.length - 1]) * 100;
      costItems.push(makeItem(
        'R&D as % of Revenue',
        `Latest: ${latestPct.toFixed(1)}%`,
        rdVals.map(v => Math.abs(v)),
        latestPct > 5 ? 'bull' : latestPct > 2 ? 'neutral' : 'neutral',
        latestPct > 15 ? 'Heavy Investment' : latestPct > 5 ? 'Investing in Innovation' : 'Low R&D',
        'R&D investment sustains long-term competitive advantages'
      ));
    }
  }

  // D&A analysis
  const daRow = findRowAny(is, 'Depreciación y amortización', 'Depreciation', 'D&A');
  if (daRow && revenueRow) {
    const daVals = getRecentValues(daRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (daVals.length >= 2 && revVals.length >= 2) {
      const latestPct = (Math.abs(daVals[daVals.length - 1]) / revVals[revVals.length - 1]) * 100;
      costItems.push(makeItem(
        'D&A as % of Revenue',
        `Latest: ${latestPct.toFixed(1)}%`,
        daVals.map(v => Math.abs(v)),
        latestPct < 5 ? 'bull' : latestPct < 10 ? 'neutral' : 'bear',
        latestPct < 5 ? 'Asset-light' : latestPct < 10 ? 'Moderate' : 'Capital Intensive',
        'High D&A = heavy fixed assets or acquisitions with amortization'
      ));
    }
  }

  // Effective Tax Rate
  const taxRateRow = findRowAny(is, 'Tasa impositiva efectiva', 'Effective Tax Rate');
  if (taxRateRow) {
    const vals = getRecentValues(taxRateRow, 6);
    const latest = vals[vals.length - 1];
    const sd = stddev(vals);
    if (latest !== null) {
      costItems.push(makeItem(
        'Effective Tax Rate',
        `Latest: ${latest.toFixed(1)}%`,
        vals,
        latest > 10 && latest < 28 ? 'bull' : latest < 10 ? 'neutral' : 'bear',
        latest < 10 ? 'Unusually Low (check sustainability)' : latest < 22 ? 'Tax Efficient' : latest < 28 ? 'Normal' : 'High Tax Burden',
        sd !== null ? `Consistency: σ=${sd.toFixed(1)}pp — ${sd < 3 ? 'stable' : 'volatile tax rate'}` : ''
      ));
    }
  }

  // Interest Expense analysis
  const intExpRow = findRowAny(is, 'Gastos por intereses', 'Interest Expense');
  if (intExpRow && revenueRow) {
    const intVals = getRecentValues(intExpRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (intVals.length >= 1 && revVals.length >= 1) {
      const latestPct = (Math.abs(intVals[intVals.length - 1]) / revVals[revVals.length - 1]) * 100;
      if (latestPct > 0.5) {
        costItems.push(makeItem(
          'Interest Expense as % of Revenue',
          `Latest: ${latestPct.toFixed(1)}%`,
          intVals.map(v => Math.abs(v)),
          latestPct < 2 ? 'bull' : latestPct < 5 ? 'neutral' : 'bear',
          latestPct < 2 ? 'Minimal' : latestPct < 5 ? 'Manageable' : 'Heavy Interest Burden'
        ));
      }
    }
  }

  // Stock-Based Compensation
  const sbcRow = findRowAny(cf, 'Compensación basada en acciones', 'Stock-Based Compensation', 'Stock Based Comp');
  if (sbcRow && revenueRow) {
    const sbcVals = getRecentValues(sbcRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (sbcVals.length >= 1 && revVals.length >= 1) {
      const latestPct = (Math.abs(sbcVals[sbcVals.length - 1]) / revVals[revVals.length - 1]) * 100;
      costItems.push(makeItem(
        'Stock-Based Comp as % of Revenue',
        `Latest: ${latestPct.toFixed(1)}%`,
        sbcVals.map(v => Math.abs(v)),
        latestPct < 3 ? 'bull' : latestPct < 8 ? 'neutral' : 'bear',
        latestPct < 3 ? 'Low Dilution' : latestPct < 8 ? 'Moderate SBC' : 'Heavy SBC Dilution',
        'High SBC overstates GAAP earnings vs true cash cost'
      ));
    }
  }

  if (costItems.length) {
    const bullCount = costItems.filter(i => i.signal === 'bull').length;
    const bearCount = costItems.filter(i => i.signal === 'bear').length;
    const grade = bullCount >= 3 ? 'excellent' : bullCount >= 2 ? 'good' : bearCount >= 2 ? 'poor' : 'average';
    results.scores.costs = grade;
    results.sections.push({ id: 'costs', title: 'Cost Structure & OpEx', icon: '🏗️', grade, items: costItems });
  }

  // ══════════════════════════════════════════════════════════
  // 4. RETURNS & ECONOMIC MOAT
  // ══════════════════════════════════════════════════════════
  const moatItems = [];

  const roicRow = findRowAny(ratios, 'Return on Invested Capital', 'Normalized ROIC', 'ROIC');
  if (roicRow) {
    const vals = getRecentValues(roicRow, 10);
    const latest = vals[vals.length - 1];
    const trend = getTrend(vals);
    const avgVal = avg(vals);
    moatItems.push(makeItem(
      'ROIC (Return on Invested Capital)',
      `Latest: ${latest?.toFixed(1)}% | Avg: ${avgVal?.toFixed(1)}% — Trend: ${trend}`,
      vals,
      latest > mt('roic', 'bull') ? 'bull' : latest > mt('roic', 'neutral') ? 'neutral' : 'bear',
      latest > mt('roic', 'bull') + 5 ? 'Exceptional Moat' : latest > mt('roic', 'bull') ? 'Wide Moat' : latest > mt('roic', 'neutral') ? 'Narrow Moat' : 'No Moat',
      'ROIC > WACC (~8-10%) = value creation. Consistency matters more than level'
    ));
  }

  const roeRow = findRowAny(ratios, 'Rentabilidad sobre recursos propios', 'recursos propios', 'ROE', 'Return on Equity');
  if (roeRow) {
    const vals = getRecentValues(roeRow, 10);
    const latest = vals[vals.length - 1];
    moatItems.push(makeItem(
      'ROE (Return on Equity)',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 20 ? 'bull' : latest > 12 ? 'neutral' : 'bear',
      latest > 25 ? 'Outstanding' : latest > 20 ? 'Excellent' : latest > 12 ? 'Good' : 'Below Average',
      'Beware: high leverage can inflate ROE artificially'
    ));
  }

  const roaRow = findRowAny(ratios, 'Rentabilidad sobre activos', 'ROA', 'Return on Assets');
  if (roaRow) {
    const vals = getRecentValues(roaRow, 10);
    const latest = vals[vals.length - 1];
    moatItems.push(makeItem(
      'ROA (Return on Assets)',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 10 ? 'bull' : latest > 5 ? 'neutral' : 'bear',
      latest > 15 ? 'Asset-light Star' : latest > 10 ? 'Efficient' : latest > 5 ? 'OK' : 'Capital Heavy'
    ));
  }

  // Dupont decomposition insight: ROE driven by margins vs leverage
  if (roeRow && roaRow) {
    const roe = getLatest(roeRow);
    const roa = getLatest(roaRow);
    if (roe && roa && roa !== 0) {
      const equityMultiplier = roe / roa;
      moatItems.push(makeItem(
        'Equity Multiplier (ROE/ROA)',
        `${equityMultiplier.toFixed(1)}x — ${equityMultiplier < 2 ? 'Low leverage' : equityMultiplier < 3 ? 'Moderate leverage' : 'High leverage'}`,
        [],
        equityMultiplier < 2 ? 'bull' : equityMultiplier < 3 ? 'neutral' : 'bear',
        equityMultiplier < 2 ? 'Quality ROE' : equityMultiplier < 3 ? 'Some Leverage' : 'Leverage-driven ROE',
        'ROE = ROA × Equity Multiplier. Lower multiplier = ROE driven by profitability, not debt'
      ));
    }
  }

  const fcfNetRow = findRowAny(ratios, 'Free / Net Income', 'FCF / Net Income');
  if (fcfNetRow) {
    const vals = getRecentValues(fcfNetRow, 8);
    const latest = vals[vals.length - 1];
    if (latest !== null && latest < 0) {
      moatItems.push(makeItem(
        'FCF / Net Income (Earnings Quality)',
        'Not meaningful: Net Income ≤ 0 in recent period(s)',
        vals,
        'neutral',
        'Not meaningful',
        'When NI is negative, conversion ratios can invert; use CFO/FCF margin context instead'
      ));
    } else {
      moatItems.push(makeItem(
        'FCF / Net Income (Earnings Quality)',
        `Latest: ${latest?.toFixed(0)}%`,
        vals,
        latest > 100 ? 'bull' : latest > 70 ? 'neutral' : 'bear',
        latest > 120 ? 'Super Cash Generative' : latest > 100 ? 'Quality Earnings' : latest > 70 ? 'Decent' : 'Accrual Heavy',
        'FCF > Net Income = real cash earnings; <70% = beware accounting tricks'
      ));
    }
  }

  const capexSalesRow = findRowAny(ratios, 'Capex / Sales', 'Capex/Sales');
  if (capexSalesRow) {
    const vals = getRecentValues(capexSalesRow, 8);
    const latest = vals[vals.length - 1];
    moatItems.push(makeItem(
      'Capex / Sales (Maintenance Need)',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest < 5 ? 'bull' : latest < 10 ? 'neutral' : 'bear',
      latest < 3 ? 'Ultra Asset-light' : latest < 5 ? 'Asset-light' : latest < 10 ? 'Moderate' : 'Capital Intensive'
    ));
  }

  if (moatItems.length) {
    const bullCount = moatItems.filter(i => i.signal === 'bull').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bullCount >= 1 ? 'average' : 'poor';
    results.scores.moat = grade;
    results.sections.push({ id: 'moat', title: 'Returns & Economic Moat', icon: '🏰', grade, items: moatItems });
  }

  // ══════════════════════════════════════════════════════════
  // 5. BALANCE SHEET HEALTH
  // ══════════════════════════════════════════════════════════
  const bsItems = [];

  // Current Assets composition
  const cashRow = findRowAny(bs, 'Efectivo y equivalentes', 'Cash and Cash Equivalents', 'Cash & Equivalents');
  const stInvRow = findRowAny(bs, 'Inversiones a corto plazo', 'Short-Term Investments');
  const arRow = findRowAny(bs, 'Cuentas por cobrar', 'Accounts Receivable', 'Trade Receivables');
  const invRow = findRowAny(bs, 'Inventarios', 'Inventory', 'Inventories');
  const totalCARow = findRowAny(bs, 'Total activos corrientes', 'Total Current Assets');
  const totalAssetsRow = findRowAny(bs, 'Activos totales', 'Total Assets');

  if (cashRow && totalAssetsRow) {
    const cashVals = getRecentValues(cashRow, 6);
    const taVals = getRecentValues(totalAssetsRow, 6);
    if (cashVals.length >= 1 && taVals.length >= 1) {
      const cashPct = (cashVals[cashVals.length - 1] / taVals[taVals.length - 1]) * 100;
      bsItems.push(makeItem(
        'Cash & Equivalents / Total Assets',
        `Latest: ${cashPct.toFixed(1)}% ($${(cashVals[cashVals.length - 1]).toFixed(0)}M)`,
        cashVals,
        cashPct > 15 ? 'bull' : cashPct > 5 ? 'neutral' : 'bear',
        cashPct > 20 ? 'Cash Rich' : cashPct > 15 ? 'Healthy Buffer' : cashPct > 5 ? 'Adequate' : 'Cash Light'
      ));
    }
  }

  if (arRow && revenueRow) {
    const arVals = getRecentValues(arRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (arVals.length >= 2 && revVals.length >= 2) {
      const arDays = (arVals[arVals.length - 1] / revVals[revVals.length - 1]) * 365;
      const trend = getTrend(arVals.map((v, i) => revVals[i] ? (v / revVals[i]) * 365 : null));
      bsItems.push(makeItem(
        'Accounts Receivable (Days)',
        `~${arDays.toFixed(0)} days — Trend: ${trend}`,
        arVals,
        arDays < 45 ? 'bull' : arDays < 75 ? 'neutral' : 'bear',
        arDays < 30 ? 'Quick Collection' : arDays < 45 ? 'Healthy' : arDays < 75 ? 'Normal' : 'Slow Collection'
      ));
    }
  }

  if (invRow && revenueRow) {
    const invVals = getRecentValues(invRow, 6);
    const revVals = getRecentValues(revenueRow, 6);
    if (invVals.length >= 1 && revVals.length >= 1) {
      const latestInv = invVals[invVals.length - 1];
      const cogsLatest = cogsRow ? getLatest(cogsRow) : null;
      if (latestInv > 0) {
        const daysRef = cogsLatest ? cogsLatest : revVals[revVals.length - 1];
        const invDays = (latestInv / Math.abs(daysRef)) * 365;
        bsItems.push(makeItem(
          'Inventory (Days on Hand)',
          `~${invDays.toFixed(0)} days | $${latestInv.toFixed(0)}M`,
          invVals,
          invDays < 45 ? 'bull' : invDays < 90 ? 'neutral' : 'bear',
          invDays < 30 ? 'Lean' : invDays < 45 ? 'Efficient' : invDays < 90 ? 'Normal' : 'Heavy Inventory'
        ));
      }
    }
  }

  // Goodwill & Intangibles as % of Total Assets
  const gwRow = findRowAny(bs, 'Fondo de comercio', 'Goodwill');
  const intangRow = findRowAny(bs, 'Activos intangibles', 'Intangible Assets', 'Intangibles');
  if ((gwRow || intangRow) && totalAssetsRow) {
    const gw = gwRow ? getLatest(gwRow) : 0;
    const intang = intangRow ? getLatest(intangRow) : 0;
    const ta = getLatest(totalAssetsRow);
    if (ta && ta > 0) {
      const total = (gw || 0) + (intang || 0);
      const pct = (total / ta) * 100;
      bsItems.push(makeItem(
        'Goodwill + Intangibles / Total Assets',
        `${pct.toFixed(1)}% ($${total.toFixed(0)}M of $${ta.toFixed(0)}M)`,
        [],
        pct < 15 ? 'bull' : pct < 35 ? 'neutral' : 'bear',
        pct < 10 ? 'Organic Growth' : pct < 15 ? 'Low' : pct < 35 ? 'Acquisition-driven' : 'Impairment Risk',
        'High goodwill = acquisition risk. Watch for impairment charges'
      ));
    }
  }

  // PP&E
  const ppeRow = findRowAny(bs, 'Propiedad, planta y equipo', 'Property, Plant', 'PP&E', 'Net PP&E');
  if (ppeRow && totalAssetsRow) {
    const ppe = getLatest(ppeRow);
    const ta = getLatest(totalAssetsRow);
    if (ppe && ta && ta > 0) {
      const pct = (ppe / ta) * 100;
      bsItems.push(makeItem(
        'PP&E / Total Assets',
        `${pct.toFixed(1)}%`,
        getRecentValues(ppeRow, 6),
        pct < 20 ? 'bull' : pct < 40 ? 'neutral' : 'bear',
        pct < 15 ? 'Asset-light' : pct < 20 ? 'Low' : pct < 40 ? 'Moderate' : 'Asset Heavy'
      ));
    }
  }

  // Retained Earnings trend
  const retEarnRow = findRowAny(bs, 'Beneficios retenidos', 'Retained Earnings');
  if (retEarnRow) {
    const vals = getRecentValues(retEarnRow, 8);
    const trend = getTrend(vals);
    const latest = vals[vals.length - 1];
    bsItems.push(makeItem(
      'Retained Earnings',
      `Latest: $${latest?.toFixed(0)}M — Trend: ${trend}`,
      vals,
      trend === 'up' && latest > 0 ? 'bull' : latest > 0 ? 'neutral' : 'bear',
      latest < 0 ? 'Accumulated Deficit ⚠️' : trend === 'up' ? 'Growing' : 'Flat/Declining',
      latest < 0 ? 'Negative retained earnings = company has not been profitable historically' : ''
    ));
  }

  // Total Equity trend
  const totalEquityRow = findRowAny(bs, 'Total fondos propios', 'Total Equity', 'Patrimonio neto total');
  if (totalEquityRow) {
    const vals = getRecentValues(totalEquityRow, 8);
    const trend = getTrend(vals);
    const latest = vals[vals.length - 1];
    bsItems.push(makeItem(
      'Total Equity',
      `Latest: $${latest?.toFixed(0)}M — Trend: ${trend}`,
      vals,
      latest > 0 && trend === 'up' ? 'bull' : latest > 0 ? 'neutral' : 'bear',
      latest < 0 ? 'Negative Equity ⚠️' : trend === 'up' ? 'Growing Book Value' : 'Stable'
    ));
  }

  if (bsItems.length) {
    const bullCount = bsItems.filter(i => i.signal === 'bull').length;
    const bearCount = bsItems.filter(i => i.signal === 'bear').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bearCount >= 3 ? 'poor' : 'average';
    results.scores.balance = grade;
    results.sections.push({ id: 'balance-composition', title: 'Balance Sheet Composition', icon: '📊', grade, items: bsItems });
  }

  // ══════════════════════════════════════════════════════════
  // 6. DEBT & FINANCIAL HEALTH
  // ══════════════════════════════════════════════════════════
  const debtItems = [];

  const debtEquityRow = findRowAny(ratios, 'Deuda total / Fondos propios', 'Total Debt/Equity', 'Debt to Equity');
  if (debtEquityRow) {
    const vals = getRecentValues(debtEquityRow, 8);
    const latest = vals[vals.length - 1];
    debtItems.push(makeItem(
      'Debt / Equity',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest < 30 ? 'bull' : latest < 80 ? 'neutral' : 'bear',
      latest < 20 ? 'Near Debt-free' : latest < 30 ? 'Conservative' : latest < 80 ? 'Moderate' : 'Leveraged'
    ));
  }

  const netDebtEbitdaRow = findRowAny(ce, 'Deuda Neta / EBITDA');
  const ndERow2 = findRowAny(ratios, 'Net Debt / EBITDA');
  const ndeSrc = netDebtEbitdaRow || ndERow2;
  if (ndeSrc) {
    const vals = getRecentValues(ndeSrc, 6);
    const latest = vals[vals.length - 1];
    debtItems.push(makeItem(
      'Net Debt / EBITDA',
      `Latest: ${latest?.toFixed(1)}x`,
      vals,
      latest < 0 ? 'bull' : latest < 2 ? 'neutral' : 'bear',
      latest < 0 ? 'Net Cash Position' : latest < 1 ? 'Very Low Debt' : latest < 2 ? 'Safe' : latest < 3 ? 'Moderate' : 'Highly Leveraged',
      'Private equity stress threshold is typically 4-5x'
    ));
  }

  // Long-term debt
  const ltDebtRow = findRowAny(bs, 'Deuda a largo plazo', 'Long-Term Debt', 'Long Term Debt');
  const stDebtRow = findRowAny(bs, 'Deuda a corto plazo', 'Short-Term Debt', 'Short Term Borrowings');
  if (ltDebtRow) {
    const ltVals = getRecentValues(ltDebtRow, 6);
    const trend = getTrend(ltVals);
    const latest = ltVals[ltVals.length - 1];
    debtItems.push(makeItem(
      'Long-Term Debt',
      `Latest: $${latest?.toFixed(0)}M — Trend: ${trend}`,
      ltVals,
      trend === 'down' ? 'bull' : trend === 'stable' ? 'neutral' : 'bear',
      trend === 'down' ? 'Deleveraging' : trend === 'stable' ? 'Stable' : 'Increasing Debt'
    ));
  }

  const currentRatioRow = findRowAny(ratios, 'Ratio de liquidez', 'Current Ratio');
  if (currentRatioRow) {
    const vals = getRecentValues(currentRatioRow, 6);
    const latest = vals[vals.length - 1];
    debtItems.push(makeItem(
      'Current Ratio',
      `Latest: ${latest?.toFixed(2)}x`,
      vals,
      latest > 1.5 ? 'bull' : latest > 1.0 ? 'neutral' : 'bear',
      latest > 2.0 ? 'Very Healthy' : latest > 1.5 ? 'Healthy' : latest > 1.0 ? 'Adequate' : 'Tight Liquidity ⚠️',
      '',
      { scoreRule: "latest > 1.5 ? 'bull' : latest > 1.0 ? 'neutral' : 'bear'; latest > 2.0 ? 'Very Healthy' : latest > 1.5 ? 'Healthy' : latest > 1.0 ? 'Adequate' : 'Tight Liquidity ⚠️'." }
    ));
  }

  // Quick Ratio
  const quickRatioRow = findRowAny(ratios, 'Quick Ratio', 'Ratio rápido', 'Acid Test');
  if (quickRatioRow) {
    const vals = getRecentValues(quickRatioRow, 6);
    const latest = vals[vals.length - 1];
    debtItems.push(makeItem(
      'Quick Ratio (Acid Test)',
      `Latest: ${latest?.toFixed(2)}x`,
      vals,
      latest > 1.2 ? 'bull' : latest > 0.8 ? 'neutral' : 'bear',
      latest > 1.5 ? 'Very Liquid' : latest > 1.2 ? 'Healthy' : latest > 0.8 ? 'OK' : 'Low Liquidity ⚠️',
      'Excludes inventory — more conservative than current ratio',
      { scoreRule: "latest > 1.2 ? 'bull' : latest > 0.8 ? 'neutral' : 'bear'; latest > 1.5 ? 'Very Liquid' : latest > 1.2 ? 'Healthy' : latest > 0.8 ? 'OK' : 'Low Liquidity ⚠️'; Excludes inventory." }
    ));
  }

  const ebitInterestCovRow = findRowAny(ratios, ['EBIT', 'Interest Expense'], ['EBIT', 'Interest']);
  const ffoInterestCovRow = findRowAny(ratios, ['FFO', 'Interest Coverage']);
  const ebitdaInterestCovRow = findRowAny(ratios, ['EBITDA', 'Interest Expense'], ['EBITDA', 'Interest']);
  const interestCovRow = ebitInterestCovRow || ffoInterestCovRow || ebitdaInterestCovRow;
  if (interestCovRow) {
    const vals = getRecentValues(interestCovRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      const coverageLabel = interestCovRow === ebitInterestCovRow
        ? 'Interest Coverage (EBIT / Interest)'
        : interestCovRow === ffoInterestCovRow
          ? 'Interest Coverage (FFO / Interest)'
          : 'Interest Coverage (EBITDA / Interest)';
      debtItems.push(makeItem(
        coverageLabel,
        `Latest: ${latest?.toFixed(1)}x`,
        vals,
        latest > 8 ? 'bull' : latest > 3 ? 'neutral' : 'bear',
        latest > 15 ? 'Fortress' : latest > 8 ? 'Well Covered' : latest > 3 ? 'OK' : 'Risky ⚠️'
      ));
    }
  }

  const cashAssetsRow = findRowAny(ratios, 'Cash / Assets');
  if (cashAssetsRow) {
    const vals = getRecentValues(cashAssetsRow, 6);
    const latest = vals[vals.length - 1];
    debtItems.push(makeItem(
      'Cash / Assets',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 15 ? 'bull' : latest > 5 ? 'neutral' : 'bear',
      latest > 20 ? 'Cash Rich' : latest > 15 ? 'Healthy' : latest > 5 ? 'OK' : 'Cash Light'
    ));
  }

  if (debtItems.length) {
    const bullCount = debtItems.filter(i => i.signal === 'bull').length;
    const bearCount = debtItems.filter(i => i.signal === 'bear').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bearCount >= 3 ? 'poor' : bullCount >= 1 ? 'average' : 'poor';
    results.scores.debt = grade;
    results.sections.push({ id: 'debt', title: 'Debt & Financial Health', icon: '🏦', grade, items: debtItems });
  }

  // ══════════════════════════════════════════════════════════
  // 7. CASH FLOW QUALITY
  // ══════════════════════════════════════════════════════════
  const cfItems = [];

  const cfoRow = findRowAny(cf, 'Flujo de caja de las operaciones', 'Cash From Operations', 'Operating Cash Flow');
  if (cfoRow) {
    const vals = getRecentValues(cfoRow, 8);
    const latest = vals[vals.length - 1];
    const trend = getTrend(vals);
    const allPositive = vals.every(v => v > 0);
    cfItems.push(makeItem(
      'Cash From Operations',
      `Latest: $${latest?.toFixed(0)}M — Trend: ${trend}`,
      vals,
      allPositive && trend !== 'down' ? 'bull' : latest > 0 ? 'neutral' : 'bear',
      allPositive ? (trend === 'up' ? 'Growing & Consistent' : 'Consistent') : 'Inconsistent ⚠️',
      allPositive ? 'Positive CFO every year — strong sign' : 'Some negative CFO years — investigate'
    ));
  }

  // CFO vs Net Income (Accrual check)
  if (cfoRow && netIncRow) {
    const cfoVals = getRecentValues(cfoRow, 6);
    const niVals = getRecentValues(netIncRow, 6);
    if (cfoVals.length >= 3 && niVals.length >= 3) {
      const allMeaningful = niVals.every(v => v !== null && v > 0);
      if (!allMeaningful) {
        cfItems.push(makeItem(
          'CFO / Net Income (Cash Conversion)',
          'Not meaningful: Net Income ≤ 0 in one or more periods',
          [],
          'neutral',
          'Not meaningful',
          'Use CFO margin / FCF margin when earnings are negative or near zero'
        ));
      } else {
        const ratioVals = cfoVals.map((v, i) => niVals[i] ? (v / niVals[i]) * 100 : null).filter(v => v !== null);
        const avgRatio = avg(ratioVals);
        cfItems.push(makeItem(
          'CFO / Net Income (Cash Conversion)',
          `Average: ${avgRatio?.toFixed(0)}%`,
          ratioVals,
          avgRatio > 100 ? 'bull' : avgRatio > 75 ? 'neutral' : 'bear',
          avgRatio > 120 ? 'Superior Cash Conversion' : avgRatio > 100 ? 'Healthy' : avgRatio > 75 ? 'Moderate' : 'Poor Conversion ⚠️',
          'CFO should generally exceed Net Income. If not, earnings may include non-cash accruals'
        ));
      }
    }
  }

  const capexRow = findRowAny(cf, 'Gastos de capital', 'Capital Expenditures', 'CapEx');
  if (capexRow && cfoRow) {
    const capVals = getRecentValues(capexRow, 6);
    const cfoVals = getRecentValues(cfoRow, 6);
    if (capVals.length >= 2 && cfoVals.length >= 2) {
      const ratioVals = capVals.map((v, i) => cfoVals[i] ? (Math.abs(v) / cfoVals[i]) * 100 : null).filter(v => v !== null);
      const latestR = ratioVals[ratioVals.length - 1];
      cfItems.push(makeItem(
        'Capex / CFO (Reinvestment Rate)',
        `Latest: ${latestR?.toFixed(0)}%`,
        ratioVals,
        latestR < 30 ? 'bull' : latestR < 50 ? 'neutral' : 'bear',
        latestR < 25 ? 'Low Reinvestment Need' : latestR < 30 ? 'Efficient' : latestR < 50 ? 'Moderate' : 'Heavy Reinvestment',
        'Lower = more FCF available for shareholders'
      ));
    }
  }

  // Working Capital changes
  const wcRow = findRowAny(cf, 'Variaciones en el capital circulante', 'Changes in Working Capital');
  if (wcRow) {
    const vals = getRecentValues(wcRow, 6);
    const latest = vals[vals.length - 1];
    const avgWC = avg(vals);
    cfItems.push(makeItem(
      'Working Capital Changes',
      `Latest: $${latest?.toFixed(0)}M | Avg: $${avgWC?.toFixed(0)}M`,
      vals,
      avgWC > 0 ? 'bull' : avgWC > -50 ? 'neutral' : 'bear',
      avgWC > 0 ? 'Source of Cash' : 'Use of Cash',
      'Negative working capital changes can indicate growth requiring more capital'
    ));
  }

  // Acquisitions
  const acqRow = findRowAny(cf, 'Adquisiciones', 'Acquisitions');
  if (acqRow) {
    const vals = getRecentValues(acqRow, 6);
    const anyBig = vals.some(v => v !== null && Math.abs(v) > 100);
    const totalSpent = vals.reduce((s, v) => s + Math.abs(v || 0), 0);
    if (totalSpent > 0) {
      cfItems.push(makeItem(
        'Acquisitions Spending',
        `Total (${vals.length}Y): $${totalSpent.toFixed(0)}M`,
        vals.map(v => Math.abs(v || 0)),
        totalSpent < 50 ? 'bull' : !anyBig ? 'neutral' : 'bear',
        totalSpent < 50 ? 'Organic Growth' : anyBig ? 'Acquisition-heavy' : 'Selective M&A',
        'Frequent large acquisitions increase integration risk'
      ));
    }
  }

  // Debt issued vs repaid
  const debtIssuedRow = findRowAny(cf, 'Deuda emitida', 'Debt Issued', 'Borrowings');
  const debtRepaidRow = findRowAny(cf, 'Deuda reembolsada', 'Debt Repaid', 'Debt Repayment');
  if (debtIssuedRow && debtRepaidRow) {
    const issued = getRecentValues(debtIssuedRow, 6);
    const repaid = getRecentValues(debtRepaidRow, 6);
    const netDebtChange = issued.map((v, i) => (v || 0) + (repaid[i] || 0)); // repaid is negative
    const totalNet = netDebtChange.reduce((s, v) => s + v, 0);
    cfItems.push(makeItem(
      'Net Debt Issuance / Repayment',
      `Net (${issued.length}Y): $${totalNet.toFixed(0)}M`,
      netDebtChange,
      totalNet < 0 ? 'bull' : totalNet < 500 ? 'neutral' : 'bear',
      totalNet < -100 ? 'Net Deleveraging' : totalNet < 0 ? 'Slight Deleveraging' : 'Net Borrower'
    ));
  }

  // Net change in cash
  const netCashChangeRow = findRowAny(cf, 'Variación neta de tesorería', 'Net Change in Cash');
  if (netCashChangeRow) {
    const vals = getRecentValues(netCashChangeRow, 6);
    const positiveYears = vals.filter(v => v > 0).length;
    cfItems.push(makeItem(
      'Net Change in Cash',
      `Positive in ${positiveYears}/${vals.length} years`,
      vals,
      positiveYears >= vals.length * 0.6 ? 'bull' : positiveYears >= vals.length * 0.4 ? 'neutral' : 'bear',
      positiveYears >= vals.length * 0.6 ? 'Cash Accumulating' : 'Cash Volatile'
    ));
  }

  if (cfItems.length) {
    const bullCount = cfItems.filter(i => i.signal === 'bull').length;
    const bearCount = cfItems.filter(i => i.signal === 'bear').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bearCount >= 3 ? 'poor' : 'average';
    results.scores.cashflow = grade;
    results.sections.push({ id: 'cashflow', title: 'Cash Flow Quality', icon: '💸', grade, items: cfItems });
  }

  // ══════════════════════════════════════════════════════════
  // 8. EFFICIENCY & OPERATIONS
  // ══════════════════════════════════════════════════════════
  const effItems = [];

  const assetTurnRow = findRowAny(ratios, 'Rotación de activos', 'Asset Turnover');
  if (assetTurnRow) {
    const vals = getRecentValues(assetTurnRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      effItems.push(makeItem(
        'Asset Turnover',
        `Latest: ${latest?.toFixed(2)}x`,
        vals,
        latest > 0.8 ? 'bull' : latest > 0.4 ? 'neutral' : 'bear',
        latest > 1.0 ? 'Very Efficient' : latest > 0.8 ? 'Efficient' : latest > 0.4 ? 'Average' : 'Capital Heavy'
      ));
    }
  }

  const recTurnRow = findRowAny(ratios, 'Receivables Turnover', 'Rotación de cuentas por cobrar');
  if (recTurnRow) {
    const vals = getRecentValues(recTurnRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      effItems.push(makeItem(
        'Receivables Turnover',
        `Latest: ${latest?.toFixed(1)}x`,
        vals,
        latest > 8 ? 'bull' : latest > 5 ? 'neutral' : 'bear',
        latest > 10 ? 'Excellent Collection' : latest > 8 ? 'Good' : latest > 5 ? 'Average' : 'Slow Collection',
        `≈ ${(365 / latest).toFixed(0)} days to collect`
      ));
    }
  }

  const invTurnRow = findRowAny(ratios, 'Inventory Turnover', 'Rotación de inventario');
  if (invTurnRow) {
    const vals = getRecentValues(invTurnRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      effItems.push(makeItem(
        'Inventory Turnover',
        `Latest: ${latest?.toFixed(1)}x`,
        vals,
        latest > 8 ? 'bull' : latest > 4 ? 'neutral' : 'bear',
        latest > 10 ? 'Very Lean' : latest > 8 ? 'Efficient' : latest > 4 ? 'Normal' : 'Slow Moving',
        `≈ ${(365 / latest).toFixed(0)} days inventory on hand`
      ));
    }
  }

  // Cash Conversion Cycle
  const cccRow = findRowAny(ratios, 'Cash Conversion Cycle', 'Ciclo de conversión');
  if (cccRow) {
    const vals = getRecentValues(cccRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      effItems.push(makeItem(
        'Cash Conversion Cycle',
        `Latest: ${latest?.toFixed(0)} days`,
        vals,
        latest < 30 ? 'bull' : latest < 60 ? 'neutral' : 'bear',
        latest < 0 ? 'Negative CCC (Uses supplier float!)' : latest < 30 ? 'Efficient' : latest < 60 ? 'Normal' : 'Long Cycle',
        'Negative CCC = the business generates cash before paying suppliers (very powerful)'
      ));
    }
  }

  const dsoRow = findRowAny(ratios, 'Días de ventas pendientes', 'Days Sales Outstanding', 'DSO');
  if (dsoRow) {
    const vals = getRecentValues(dsoRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      effItems.push(makeItem(
        'Days Sales Outstanding (DSO)',
        `Latest: ${latest?.toFixed(0)} days`,
        vals,
        latest < 45 ? 'bull' : latest < 75 ? 'neutral' : 'bear',
        latest < 30 ? 'Excellent' : latest < 45 ? 'Quick Collection' : latest < 75 ? 'Normal' : 'Slow'
      ));
    }
  }

  const salesEmpRow = findRowAny(ratios, 'Sales Per Employee', 'Revenue Per Employee');
  if (salesEmpRow) {
    const vals = getRecentValues(salesEmpRow, 6);
    const latest = vals[vals.length - 1];
    const trend = getTrend(vals);
    if (latest !== null) {
      effItems.push(makeItem(
        'Revenue Per Employee',
        `Latest: $${(latest/1000).toFixed(0)}K — Trend: ${trend}`,
        vals,
        trend === 'up' ? 'bull' : trend === 'stable' ? 'neutral' : 'bear',
        trend === 'up' ? 'Scaling Well' : trend === 'stable' ? 'Flat' : 'Declining'
      ));
    }
  }

  const fcfCfoRow = findRowAny(ratios, 'FCF / CFO');
  if (fcfCfoRow) {
    const vals = getRecentValues(fcfCfoRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      effItems.push(makeItem(
        'FCF / CFO (Capital Efficiency)',
        `Latest: ${latest?.toFixed(1)}%`,
        vals,
        latest > 85 ? 'bull' : latest > 70 ? 'neutral' : 'bear',
        latest > 90 ? 'Ultra Efficient' : latest > 85 ? 'Low Capex Need' : latest > 70 ? 'OK' : 'Capex Heavy'
      ));
    }
  }

  if (effItems.length) {
    const bullCount = effItems.filter(i => i.signal === 'bull').length;
    const grade = bullCount >= 3 ? 'excellent' : bullCount >= 2 ? 'good' : bullCount >= 1 ? 'average' : 'poor';
    results.scores.efficiency = grade;
    results.sections.push({ id: 'efficiency', title: 'Efficiency & Operations', icon: '⚙️', grade, items: effItems });
  }

  // ══════════════════════════════════════════════════════════
  // 9. VALUATION (EXPANDED)
  // ══════════════════════════════════════════════════════════
  const valItems = [];

  // Market Cap & EV
  const vmOrIS = vm || is;
  const mcRow = findRowAny(vmOrIS, 'Capitalización bursátil', 'Market Cap');
  const evRow = findRowAny(vmOrIS, 'Valor total de la empresa', 'Total Enterprise Value', 'Enterprise Value', 'TEV');
  if (mcRow && evRow) {
    const mc = getLatest(mcRow);
    const ev = getLatest(evRow);
    if (mc && ev) {
      const evPremium = ((ev / mc) - 1) * 100;
      valItems.push(makeItem(
        'Enterprise Value vs Market Cap',
        `MC: $${(mc/1000).toFixed(1)}B | EV: $${(ev/1000).toFixed(1)}B (${evPremium > 0 ? '+' : ''}${evPremium.toFixed(0)}%)`,
        [],
        evPremium < 5 ? 'bull' : evPremium < 20 ? 'neutral' : 'bear',
        evPremium < 0 ? 'Net Cash (EV < MC)' : evPremium < 5 ? 'Minimal Debt' : evPremium < 20 ? 'Some Debt' : 'Debt-heavy EV',
        'EV > MC by a large margin = significant net debt'
      ));
    }
  }

  const peRow = findRowAny(vm, 'NTM Price / Normalized Earnings', 'NTM P/E', 'Forward P/E');
  if (peRow) {
    const vals = getRecentValues(peRow, 8);
    const latest = vals[vals.length - 1];
    const avgPE = avg(vals);
    const belowAvg = latest < avgPE;
    valItems.push(makeItem(
      'Forward P/E (NTM)',
      `Latest: ${latest?.toFixed(1)}x | Hist Avg: ${avgPE?.toFixed(1)}x`,
      vals,
      latest < 18 ? 'bull' : latest < 30 ? 'neutral' : 'bear',
      latest < 15 ? 'Deep Value' : latest < 18 ? 'Cheap' : latest < 30 ? 'Fair' : 'Expensive',
      belowAvg ? '📉 Below historical average — potentially attractive' : '📈 Above historical average'
    ));
  }

  // P/S
  const psRow = findRowAny(vm, 'Price / Sales', 'NTM Price / Revenue', 'P/S');
  if (psRow) {
    const vals = getRecentValues(psRow, 8);
    const latest = vals[vals.length - 1];
    valItems.push(makeItem(
      'Price / Sales',
      `Latest: ${latest?.toFixed(1)}x`,
      vals,
      latest < 3 ? 'bull' : latest < 8 ? 'neutral' : 'bear',
      latest < 2 ? 'Deep Value' : latest < 3 ? 'Reasonable' : latest < 8 ? 'Growth Premium' : 'Very Rich'
    ));
  }

  // P/B
  const pbRow = findRowAny(vm, 'Price / Book', 'P/B', 'Price/Book');
  if (pbRow) {
    const vals = getRecentValues(pbRow, 8);
    const latest = vals[vals.length - 1];
    valItems.push(makeItem(
      'Price / Book Value',
      `Latest: ${latest?.toFixed(1)}x`,
      vals,
      latest < 3 ? 'bull' : latest < 8 ? 'neutral' : 'bear',
      latest < 1.5 ? 'Below Book' : latest < 3 ? 'Reasonable' : latest < 8 ? 'Premium' : 'Very Rich',
      latest < 1 ? 'Trading below book value — potential deep value or value trap' : ''
    ));
  }

  const evEbitdaRow = findRowAny(vm, 'NTM Total Enterprise Value / EBITDA', 'EV/EBITDA');
  if (evEbitdaRow) {
    const vals = getRecentValues(evEbitdaRow, 8);
    const latest = vals[vals.length - 1];
    const avgVal = avg(vals);
    valItems.push(makeItem(
      'EV/EBITDA (NTM)',
      `Latest: ${latest?.toFixed(1)}x | Hist Avg: ${avgVal?.toFixed(1)}x`,
      vals,
      latest < mt('ev_ebitda', 'bull') ? 'bull' : latest < mt('ev_ebitda', 'neutral') ? 'neutral' : 'bear',
      latest < mt('ev_ebitda', 'bull') - 2 ? 'Cheap' : latest < mt('ev_ebitda', 'bull') ? 'Attractive' : latest < mt('ev_ebitda', 'neutral') ? 'Fair' : 'Rich'
    ));
  }

  // EV/EBIT
  const evEbitRow = findRowAny(vm, 'Enterprise Value / EBIT', 'EV/EBIT', 'TEV / EBIT');
  if (evEbitRow) {
    const vals = getRecentValues(evEbitRow, 8);
    const latest = vals[vals.length - 1];
    valItems.push(makeItem(
      'EV/EBIT',
      `Latest: ${latest?.toFixed(1)}x`,
      vals,
      latest < 15 ? 'bull' : latest < 25 ? 'neutral' : 'bear',
      latest < 12 ? 'Cheap' : latest < 15 ? 'Attractive' : latest < 25 ? 'Fair' : 'Expensive'
    ));
  }

  // Price / FCF
  const pfcfRow = findRowAny(vm, 'Price / Free Cash Flow', 'P/FCF');
  if (pfcfRow) {
    const vals = getRecentValues(pfcfRow, 8);
    const latest = vals[vals.length - 1];
    valItems.push(makeItem(
      'Price / Free Cash Flow',
      `Latest: ${latest?.toFixed(1)}x`,
      vals,
      latest < 20 ? 'bull' : latest < 35 ? 'neutral' : 'bear',
      latest < 15 ? 'Cheap' : latest < 20 ? 'Attractive' : latest < 35 ? 'Fair' : 'Expensive'
    ));
  }

  const fcfYieldRow = findRowAny(vm, 'Levered Free Cash Flow Yield', 'FCF Yield');
  if (fcfYieldRow) {
    const vals = getRecentValues(fcfYieldRow, 8);
    const latest = vals[vals.length - 1];
    valItems.push(makeItem(
      'FCF Yield (NTM)',
      `Latest: ${latest?.toFixed(1)}%`,
      vals,
      latest > 5 ? 'bull' : latest > 3 ? 'neutral' : 'bear',
      latest > 7 ? 'Very Attractive' : latest > 5 ? 'Good Value' : latest > 3 ? 'Fair' : 'Low Yield'
    ));
  }

  // Dividend Yield
  const divYieldRow = findRowAny(vm, 'Dividend Yield', 'Rentabilidad por dividendo');
  if (divYieldRow) {
    const vals = getRecentValues(divYieldRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null && latest > 0) {
      valItems.push(makeItem(
        'Dividend Yield',
        `Latest: ${latest.toFixed(2)}%`,
        vals,
        latest > 2 ? 'bull' : latest > 0.5 ? 'neutral' : 'neutral',
        latest > 3 ? 'High Yield' : latest > 2 ? 'Good Yield' : latest > 0.5 ? 'Modest' : 'Token Dividend'
      ));
    }
  }

  const pegRow = findRowAny(ratios, 'PEG Ratio', 'PEG');
  if (pegRow) {
    const vals = getRecentValues(pegRow, 4);
    const latest = vals[vals.length - 1];
    if (latest !== null) {
      valItems.push(makeItem(
        'PEG Ratio',
        `Latest: ${latest?.toFixed(2)}x`,
        vals,
        latest < 1 ? 'bull' : latest < 2 ? 'neutral' : 'bear',
        latest < 0.8 ? 'Very Undervalued' : latest < 1 ? 'Undervalued' : latest < 2 ? 'Fair' : 'Overvalued',
        'P/E divided by EPS growth rate. <1 = growth at a reasonable price'
      ));
    }
  }

  valItems.push(makeItem(
    'P/E Context Map (informational)',
    'Cyclical 5-10 · Stable 10-15 · Quality 15-25 · Elite 30-50+',
    [],
    'info',
    'Context only',
    'Use as a map, not a hard rule. Compare growth durability and balance-sheet risk.'
  ));

  if (valItems.length) {
    const bullCount = valItems.filter(i => i.signal === 'bull').length;
    const bearCount = valItems.filter(i => i.signal === 'bear').length;
    const grade = bullCount >= 4 ? 'excellent' : bullCount >= 2 ? 'good' : bearCount >= 4 ? 'poor' : 'average';
    results.scores.valuation = grade;
    results.sections.push({ id: 'valuation', title: 'Valuation', icon: '🏷️', grade, items: valItems });
  }

  // ══════════════════════════════════════════════════════════
  // 10. DIVIDEND & SHAREHOLDER RETURNS
  // ══════════════════════════════════════════════════════════
  const shItems = [];

  // Dividends Per Share
  const dpsRow = findRowAny(is, 'Dividendos por acción', 'Dividends Per Share', 'DPS');
  if (dpsRow) {
    const vals = getRecentValues(dpsRow, 8);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    if (latest !== null && latest > 0) {
      const gr = cagr(first, latest, vals.length - 1);
      const neverCut = vals.every((v, i) => i === 0 || v >= vals[i-1]);
      shItems.push(makeItem(
        'Dividends Per Share',
        `$${latest.toFixed(2)} | ${gr !== null ? `CAGR: ${gr.toFixed(1)}%` : ''}`,
        vals,
        neverCut ? 'bull' : latest > first ? 'neutral' : 'bear',
        neverCut ? 'Never Cut — Reliable' : latest > first ? 'Growing' : 'Volatile/Cut',
        neverCut ? '✓ Dividend has never been cut in available history' : ''
      ));
    }
  }

  // Payout Ratio
  const payoutRow = findRowAny(is, 'Payout Ratio', 'Ratio de reparto');
  if (payoutRow) {
    const vals = getRecentValues(payoutRow, 6);
    const latest = vals[vals.length - 1];
    if (latest !== null && latest > 0) {
      shItems.push(makeItem(
        'Payout Ratio',
        `Latest: ${latest.toFixed(0)}%`,
        vals,
        latest < 50 ? 'bull' : latest < 75 ? 'neutral' : 'bear',
        latest < 40 ? 'Very Safe' : latest < 50 ? 'Safe' : latest < 75 ? 'Moderate' : 'High — Risk of Cut',
        'Payout >80% of earnings leaves little room for growth or downturns'
      ));
    }
  }

  // Dividends Paid (absolute)
  const divPaidRow = findRowAny(cf, 'Dividendos pagados', 'Dividends Paid');
  if (divPaidRow) {
    const vals = getRecentValues(divPaidRow, 6);
    const latest = Math.abs(vals[vals.length - 1] || 0);
    const trend = getTrend(vals.map(v => Math.abs(v || 0)));
    if (latest > 0) {
      shItems.push(makeItem(
        'Total Dividends Paid',
        `Latest: $${latest.toFixed(0)}M — Trend: ${trend}`,
        vals.map(v => Math.abs(v || 0)),
        trend === 'up' ? 'bull' : trend === 'stable' ? 'neutral' : 'bear',
        trend === 'up' ? 'Growing Distributions' : trend === 'stable' ? 'Steady' : 'Declining'
      ));
    }
  }

  // Share Buybacks
  const buybackRow = findRowAny(cf, 'Recompra de acciones comunes', 'Common Stock Repurchased', 'Share Buybacks');
  if (buybackRow) {
    const vals = getRecentValues(buybackRow, 6);
    const hasSignificant = vals.some(v => v !== null && Math.abs(v) > 10);
    const total = vals.reduce((s, v) => s + Math.abs(v || 0), 0);
    shItems.push(makeItem(
      'Share Buybacks',
      hasSignificant ? `Total (${vals.length}Y): $${total.toFixed(0)}M` : 'Minimal/None',
      vals.map(v => Math.abs(v || 0)),
      hasSignificant ? 'bull' : 'neutral',
      hasSignificant ? 'Active Buybacks' : 'No Buybacks',
      hasSignificant ? 'Buybacks reduce share count and boost EPS' : ''
    ));
  }

  // Share Issuance (dilution check)
  const shareIssRow = findRowAny(cf, 'Emisión de acciones', 'Share Issuance', 'Common Stock Issued');
  if (shareIssRow) {
    const vals = getRecentValues(shareIssRow, 6);
    const totalIssued = vals.reduce((s, v) => s + (v || 0), 0);
    if (totalIssued > 50) {
      shItems.push(makeItem(
        'Share Issuance (Dilution)',
        `Total (${vals.length}Y): $${totalIssued.toFixed(0)}M issued`,
        vals,
        totalIssued < 50 ? 'bull' : totalIssued < 200 ? 'neutral' : 'bear',
        totalIssued < 50 ? 'Minimal' : totalIssued < 200 ? 'Some Dilution' : 'Heavy Dilution ⚠️'
      ));
    }
  }

  // Diluted Shares Outstanding trend
  const sharesRow = findRowAny(is, 'Promedio ponderado de acciones diluidas', 'Diluted Shares', 'Weighted Average Diluted');
  if (sharesRow) {
    const vals = getRecentValues(sharesRow, 10);
    const latest = vals[vals.length - 1];
    const first = vals[0];
    const shrinking = latest < first;
    const changePct = first ? ((latest - first) / first) * 100 : 0;
    shItems.push(makeItem(
      'Diluted Shares Outstanding',
      `${first?.toFixed(1)}M → ${latest?.toFixed(1)}M (${changePct > 0 ? '+' : ''}${changePct.toFixed(1)}%)`,
      vals,
      shrinking ? 'bull' : Math.abs(changePct) < 3 ? 'neutral' : 'bear',
      shrinking ? 'Shrinking ✓' : Math.abs(changePct) < 3 ? 'Stable' : 'Diluting ⚠️',
      shrinking ? 'Fewer shares = more value per share for existing holders' : ''
    ));
  }

  // Total shareholder yield = buybacks + dividends / market cap
  if ((buybackRow || divPaidRow) && mcRow) {
    const mc = getLatest(mcRow);
    const bb = buybackRow ? Math.abs(getLatest(buybackRow) || 0) : 0;
    const div = divPaidRow ? Math.abs(getLatest(divPaidRow) || 0) : 0;
    if (mc && mc > 0) {
      const totalYield = ((bb + div) / mc) * 100;
      if (totalYield > 0.5) {
        shItems.push(makeItem(
          'Total Shareholder Yield',
          `${totalYield.toFixed(1)}% (Buybacks: $${bb.toFixed(0)}M + Dividends: $${div.toFixed(0)}M)`,
          [],
          totalYield > 5 ? 'bull' : totalYield > 2 ? 'neutral' : 'neutral',
          totalYield > 5 ? 'Excellent Capital Return' : totalYield > 2 ? 'Good' : 'Modest',
          'Buybacks + dividends as % of market cap'
        ));
      }
    }
  }

  if (shItems.length) {
    const bullCount = shItems.filter(i => i.signal === 'bull').length;
    const grade = bullCount >= 3 ? 'excellent' : bullCount >= 2 ? 'good' : bullCount >= 1 ? 'average' : 'poor';
    results.scores.shareholder = grade;
    results.sections.push({ id: 'shareholder', title: 'Dividends & Shareholder Returns', icon: '🎯', grade, items: shItems });
  }

  // ══════════════════════════════════════════════════════════
  // 11. CONSENSUS ESTIMATES (Forward-looking)
  // ══════════════════════════════════════════════════════════
  if (ce) {
    const estItems = [];

    const ceRevRow = findRowAny(ce, 'Ingresos', 'Revenue');
    if (ceRevRow && revenueRow) {
      const estVals = getRecentValues(ceRevRow, 4);
      const histLatest = getLatest(revenueRow);
      const fwdLatest = estVals[estVals.length - 1];
      if (histLatest && fwdLatest) {
        const impliedGrowth = ((fwdLatest / histLatest) - 1) * 100;
        estItems.push(makeItem(
          'Consensus Revenue Estimate',
          `Fwd: $${fwdLatest.toFixed(0)}M (${impliedGrowth > 0 ? '+' : ''}${impliedGrowth.toFixed(1)}% vs last reported)`,
          estVals,
          impliedGrowth > 10 ? 'bull' : impliedGrowth > 3 ? 'neutral' : 'bear',
          impliedGrowth > 10 ? 'Strong Growth Expected' : impliedGrowth > 3 ? 'Moderate' : 'Slow/Declining'
        ));
      }
    }

    const ceEPSRow = findRowAny(ce, 'BPA', 'EPS', 'Earnings Per Share');
    if (ceEPSRow) {
      const vals = getRecentValues(ceEPSRow, 4);
      const trend = getTrend(vals);
      const latest = vals[vals.length - 1];
      estItems.push(makeItem(
        'Consensus EPS Estimate',
        `Forward: $${latest?.toFixed(2)} — Trend: ${trend}`,
        vals,
        trend === 'up' ? 'bull' : trend === 'stable' ? 'neutral' : 'bear',
        trend === 'up' ? 'Estimates Rising' : trend === 'stable' ? 'Stable' : 'Estimates Falling'
      ));
    }

    const ceEBITDARow = findRowAny(ce, 'EBITDA');
    if (ceEBITDARow) {
      const vals = getRecentValues(ceEBITDARow, 4);
      const trend = getTrend(vals);
      estItems.push(makeItem(
        'Consensus EBITDA Estimate',
        `Forward: $${vals[vals.length - 1]?.toFixed(0)}M — Trend: ${trend}`,
        vals,
        trend === 'up' ? 'bull' : trend === 'stable' ? 'neutral' : 'bear',
        trend === 'up' ? 'Growing' : 'Flat/Declining'
      ));
    }

    const ceFCFRow = findRowAny(ce, 'Free Cash Flow', 'FCF');
    if (ceFCFRow) {
      const vals = getRecentValues(ceFCFRow, 4);
      const trend = getTrend(vals);
      estItems.push(makeItem(
        'Consensus FCF Estimate',
        `Forward: $${vals[vals.length - 1]?.toFixed(0)}M — Trend: ${trend}`,
        vals,
        trend === 'up' ? 'bull' : trend === 'stable' ? 'neutral' : 'bear',
        trend === 'up' ? 'Improving' : 'Stable/Declining'
      ));
    }

    if (estItems.length) {
      results.sections.push({ id: 'consensus', title: 'Consensus Estimates', icon: '🔭', grade: 'info', items: estItems });
    }
  }

  // ══════════════════════════════════════════════════════════
  // 12. ANALYST SENTIMENT
  // ══════════════════════════════════════════════════════════
  if (apt) {
    const analystItems = [];
    const targetRow = findRowAny(apt, 'Media del precio objetivo', 'Average Price Target');
    const priceRow = findRowAny(apt, 'Precio de cierre', 'Close Price');
    if (targetRow && priceRow) {
      const target = getLatest(targetRow);
      const price = getLatest(priceRow);
      if (target && price) {
        const upside = ((target / price) - 1) * 100;
        analystItems.push(makeItem(
          'Avg Price Target vs Current',
          `Target: $${target.toFixed(0)} vs $${price.toFixed(0)} (${upside > 0 ? '+' : ''}${upside.toFixed(1)}%)`,
          getRecentValues(targetRow, 6),
          upside > 15 ? 'bull' : upside > -5 ? 'neutral' : 'bear',
          upside > 15 ? 'Significant Upside' : upside > 0 ? 'Modest Upside' : 'Downside'
        ));
      }
    }

    // High vs Low targets
    const highRow = findRowAny(apt, 'Precio objetivo alto', 'High Price Target');
    const lowRow = findRowAny(apt, 'Precio objetivo bajo', 'Low Price Target');
    if (highRow && lowRow) {
      const high = getLatest(highRow);
      const low = getLatest(lowRow);
      if (high && low) {
        const spread = ((high - low) / low) * 100;
        analystItems.push(makeItem(
          'Target Range (High/Low)',
          `$${low.toFixed(0)} — $${high.toFixed(0)} (${spread.toFixed(0)}% spread)`,
          [],
          spread < 50 ? 'bull' : spread < 100 ? 'neutral' : 'bear',
          spread < 50 ? 'High Consensus' : spread < 100 ? 'Moderate Spread' : 'Wide Disagreement'
        ));
      }
    }

    const buyRow = findRowAny(apt, 'de comprar', 'Buy Rating');
    const holdRow = findRowAny(apt, 'de mantener', 'Hold Rating');
    const sellRow = findRowAny(apt, 'de vender', 'Sell Rating');
    if (buyRow || holdRow || sellRow) {
      const buys = getLatest(buyRow) || 0;
      const holds = getLatest(holdRow) || 0;
      const sells = getLatest(sellRow) || 0;
      const total = buys + holds + sells;
      analystItems.push(makeItem(
        'Analyst Consensus',
        `Buy: ${buys} | Hold: ${holds} | Sell: ${sells} (${total} analysts)`,
        [buys, holds, sells],
        buys > holds + sells ? 'bull' : sells > buys ? 'bear' : 'neutral',
        buys > holds + sells ? 'Majority Buy' : sells > buys ? 'Caution' : 'Mixed'
      ));
    }

    if (analystItems.length) {
      results.sections.push({ id: 'analyst-noise', title: 'Analyst Sentiment (Low weight / noisy — ruido)', icon: '🔮', grade: 'info', items: analystItems });
    }
  }


  // ══════════════════════════════════════════════════════════
  // 13. HARMONY & RED FLAGS
  // ══════════════════════════════════════════════════════════
  const harmonyItems = [];
  const niRow = netIncomeRowCore;
  const dilEpsRow = findRowAny(is, 'Diluted EPS', 'EPS Diluted', ['BPA', 'Diluido']);
  const cfoRowCore = findRowAny(cf, 'Flujo de caja de las operaciones', 'Operating Cash Flow', 'Cash From Operations');
  const fcfRowCore = findRowAny(cf, 'Free Cash Flow', 'Flujo de caja libre');
  const gmRow = grossMarginRowCore;
  const nmRow = findRowAny(ratios, 'Net Margin', 'Margen neto');
  const omRow = findRowAny(ratios, 'Operating Margin', 'Margen EBIT');

  const revVals = getRecentValues(revenueRow, 4);
  const niVals = getRecentValues(niRow, 4);
  const epsVals = getRecentValues(dilEpsRow, 4);
  const revY = yoyGrowth(revVals).slice(-1)[0];
  const niY = yoyGrowth(niVals).slice(-1)[0];
  const epsY = yoyGrowth(epsVals).slice(-1)[0];
  const earnY = niY ?? epsY;
  if (revY !== null && earnY !== null) {
    const bearish = revY > 4 && earnY < -4;
    harmonyItems.push(makeItem(
      'Revenue vs Earnings Harmony',
      `Revenue YoY ${revY.toFixed(1)}% vs Earnings YoY ${earnY.toFixed(1)}%`,
      [revY, earnY],
      bearish ? 'bear' : (revY > 0 && earnY > 0 ? 'bull' : 'neutral'),
      bearish ? 'Growth-Profit Mismatch' : (revY > 0 && earnY > 0 ? 'Aligned Growth' : 'Mixed'),
      'Revenue rising while NI/EPS falls can signal weak quality growth.',
      { tip: METRIC_TIPS.harmony }
    ));
  }

  const gmv = getRecentValues(gmRow, 3); const nmv = getRecentValues(nmRow, 3); const omv = getRecentValues(omRow, 3);
  if (gmv.length && nmv.length) {
    const gLatest = gmv[gmv.length-1], nLatest = nmv[nmv.length-1];
    harmonyItems.push(makeItem(
      'Gross vs Net Margin Quality',
      `Gross ${gLatest.toFixed(1)}% vs Net ${nLatest.toFixed(1)}%`,
      [gLatest, nLatest],
      (gLatest > mt('gross_margin','bull') && nLatest < 5) ? 'bear' : (nLatest > 10 ? 'bull':'neutral'),
      (gLatest > mt('gross_margin','bull') && nLatest < 5) ? 'Leakage after gross profit' : (nLatest > 10 ? 'Healthy conversion':'Average'),
      'Classic heuristic: net margin >10% good, >20% excellent (sector-aware).',
      { tip: METRIC_TIPS.netMargin }
    ));
  }

  if (gmv.length >= 2 && omv.length >= 2) {
    const gDelta = gmv[gmv.length-1] - gmv[0];
    const oDelta = omv[omv.length-1] - omv[0];
    harmonyItems.push(makeItem(
      'Operating Discipline vs Gross Margin',
      `Gross Δ ${gDelta.toFixed(1)}pp | Op Margin Δ ${oDelta.toFixed(1)}pp`,
      [gDelta, oDelta],
      (gDelta >= 0 && oDelta < -1.5) ? 'bear' : (oDelta >= 0 ? 'bull':'neutral'),
      (gDelta >= 0 && oDelta < -1.5) ? 'Cost pressure' : (oDelta >= 0 ? 'Disciplined':'Watch costs'),
      'If gross margin is stable but operating margin falls, overhead is eating profitability.'
    ));
  }

  const cfoVals = getRecentValues(cfoRowCore, 4);
  if (niVals.length >= 2 && cfoVals.length >= 2) {
    const niL = niVals[niVals.length-1], cfoL = cfoVals[cfoVals.length-1];
    if (niL > 0) {
      const ratio = cfoL / niL;
      harmonyItems.push(makeItem(
        'CFO vs Net Income (Accrual Risk)',
        `CFO/NI: ${ratio.toFixed(2)}x`,
        [ratio],
        ratio < 0.75 ? 'bear' : ratio > 1 ? 'bull' : 'neutral',
        ratio < 0.75 ? 'Weak cash conversion' : ratio > 1 ? 'Cash-backed earnings' : 'Acceptable',
        'Low CFO relative to NI can imply accrual-heavy earnings quality risk.',
        { tip: METRIC_TIPS.accruals }
      ));
    }
  }

  const fcfValsCore = getRecentValues(fcfRowCore, 4);
  if (revVals.length >= 2 && fcfValsCore.length >= 2) {
    const revT = getTrend(revVals); const niT = getTrend(niVals.length?niVals:epsVals); const fcfT = getTrend(fcfValsCore);
    const bear = revT === 'up' && niT === 'up' && (fcfT === 'stable' || fcfT === 'down');
    harmonyItems.push(makeItem(
      'FCF Consistency Check',
      `Revenue trend: ${revT} | Earnings trend: ${niT} | FCF trend: ${fcfT}`,
      fcfValsCore,
      bear ? 'bear' : (fcfT === 'up' ? 'bull':'neutral'),
      bear ? 'Accounting lead, cash lags' : (fcfT === 'up' ? 'Cash confirms':'Neutral'),
      'FCF is the crown jewel: rising profits should eventually show up in free cash flow.',
      { tip: METRIC_TIPS.fcf }
    ));
  }
  if (harmonyItems.length) {
    const bullCount = harmonyItems.filter(i => i.signal === 'bull').length;
    const bearCount = harmonyItems.filter(i => i.signal === 'bear').length;
    const grade = bearCount >= 2 ? 'poor' : bullCount >= 3 ? 'good' : 'average';
    results.sections.push({ id: 'harmony', title: 'Harmony & Red Flags', icon: '🧭', grade, items: harmonyItems });
    results.scores.harmony = grade;
  }

  // Balance sheet reality check
  const balanceItems = [];
  const debtRow = findRowAny(bs, 'Total Debt', 'Deuda total');
  const cashRowCore = findRowAny(bs, 'Cash and Cash Equivalents', 'Cash And Equivalents', 'Efectivo y equivalentes', 'Cash & Equivalents');
  const stInvCore2 = findRowAny(bs, 'Short-Term Investments', 'Inversiones a corto plazo');
  const stDebtL = sumLatestRows(
    bs,
    ['Short-Term Debt'],
    ['Short Term Borrowings'],
    ['Current Portion', 'Long-Term Debt'],
    ['Current Portion', 'Capital Lease'],
    ['Current Portion', 'Debt'],
    ['Deuda', 'corto']
  );
  const cfoLatest = getLatest(cfoRowCore);
  const debtL = getLatest(debtRow), cashL = getLatest(cashRowCore) || 0, stInvL = getLatest(stInvCore2) || 0;
  if (debtL !== null) {
    const netDebt = debtL - (cashL + stInvL);
    balanceItems.push(makeItem('Net Debt / Net Cash', `Net ${netDebt < 0 ? 'Cash' : 'Debt'}: ${Math.abs(netDebt).toFixed(0)}`, [netDebt], netDebt < 0 ? 'bull' : 'neutral', netDebt < 0 ? 'Net Cash (Caja neta)' : 'Net Debt', cfoLatest ? `Net debt / CFO ≈ ${(netDebt / cfoLatest).toFixed(1)}x` : '', { tip: METRIC_TIPS.netDebt }));
  }
  if (stDebtL !== null && stDebtL > 0 && cashL !== null) {
    const cov = cashL / stDebtL;
    balanceItems.push(makeItem('Cash / Short-Term Debt', `${cov.toFixed(2)}x coverage`, [cov], cov >= 1 ? 'bull' : cov >= 0.5 ? 'neutral' : 'bear', cov >= 1 ? 'Covered' : cov >= 0.5 ? 'Tight' : 'Refinancing risk'));
  }
  const arDays = findRowAny(ratios, 'Days Sales Outstanding', 'DSO', 'Días de ventas pendientes');
  const arVals = getRecentValues(arDays, 4);
  if (arVals.length >= 2) {
    const delta = arVals[arVals.length-1]-arVals[0];
    balanceItems.push(makeItem('Receivables Days Trend', `DSO Δ ${delta.toFixed(1)} days`, arVals, delta > 7 ? 'bear' : delta < 0 ? 'bull' : 'neutral', delta > 7 ? 'Collections weakening' : delta < 0 ? 'Improving' : 'Stable'));
  }
  const invRow2 = findRowAny(bs, 'Inventory', 'Inventories', 'Inventarios');
  const invVals2 = getRecentValues(invRow2, 4);
  if (invVals2.length >= 2 && revVals.length >= 2) {
    const invY = yoyGrowth(invVals2).slice(-1)[0];
    const revYY = yoyGrowth(revVals).slice(-1)[0];
    if (invY !== null && revYY !== null) {
      const spread = invY - revYY;
      balanceItems.push(makeItem('Inventory vs Revenue Growth', `Inventory YoY ${invY.toFixed(1)}% vs Revenue YoY ${revYY.toFixed(1)}% (Δ ${spread.toFixed(1)}pp)`, [invY, revYY], spread > 12 ? 'bear' : 'neutral', spread > 12 ? 'Build faster than sales' : 'In line', 'Inventory building much faster than sales can raise obsolescence/manipulation risk.'));
    }
  }
  const gw = getLatest(findRowAny(bs, 'Goodwill', 'Fondo de comercio')) || 0;
  const inta = getLatest(findRowAny(bs, 'Intangible', 'Intangibles', 'Activos intangibles')) || 0;
  const assetsL = getLatest(assetsCore);
  if (assetsL) {
    const pct = ((gw + inta)/assetsL)*100;
    const impRow = findRowAny(is, 'impairment', 'deterioro', 'write-down', 'goodwill impairment') || findRowAny(cf, 'impairment', 'deterioro', 'write-down');
    const imp = getLatest(impRow);
    balanceItems.push(makeItem('Goodwill + Intangibles Concentration', `${pct.toFixed(1)}% of assets${imp ? ` | Impairment: ${Math.abs(imp).toFixed(0)}`:''}`, [pct], pct > 45 || imp ? 'bear' : pct > 25 ? 'neutral' : 'bull', pct > 45 || imp ? 'Impairment watch' : 'Manageable', 'Acquisition premium may be revised down when impairments appear.'));
  }
  const deferredRow = findRowAny(bs, 'Deferred Revenue', 'Unearned Revenue', 'Ingresos no devengados', 'Ingresos diferidos');
  if (deferredRow && revenueRow) {
    const d = getLatest(deferredRow), r = getLatest(revenueRow);
    if (d !== null && r) {
      const ratio = d / r * 100;
      balanceItems.push(makeItem('Deferred Revenue Signal', `${ratio.toFixed(1)}% of revenue`, getRecentValues(deferredRow,4), ratio > 10 ? 'bull' : 'neutral', ratio > 10 ? 'Useful forward demand' : 'Limited', 'Cash collected for future delivery (ingresos cobrados por adelantado).', { tip: METRIC_TIPS.deferredRevenue }));
    }
  }
  if (balanceItems.length) results.sections.push({ id: 'balance', title: 'Balance Sheet Reality Check', icon: '🧱', grade: balanceItems.filter(i=>i.signal==='bear').length>=2?'poor':'good', items: balanceItems });

  // Cash flow truth serum
  const truthItems = [];
  const capexCF = capexCore;
  let fcfComputed = getLatest(fcfRowCore);
  if (fcfComputed === null && getLatest(cfoRowCore) !== null && getLatest(capexCF) !== null) {
    fcfComputed = getLatest(cfoRowCore) - Math.abs(getLatest(capexCF));
    truthItems.push(makeItem('Computed FCF (CFO - |Capex|)', `Derived FCF: ${fcfComputed.toFixed(0)}`, [fcfComputed], 'info', 'Computed', 'FCF row missing; using CFO minus absolute capex.', { tip: METRIC_TIPS.fcf }));
  }
  const daRow2 = findRowAny(is, 'Depreciation', 'Amortization', 'Depreciación y amortización', 'D&A');
  if (capexCF && daRow2) {
    const cap = Math.abs(getLatest(capexCF) || 0), da = Math.abs(getLatest(daRow2) || 0);
    if (da > 0) {
      const ratio = cap / da;
      truthItems.push(makeItem('Capex / D&A Heuristic', `${ratio.toFixed(2)}x`, [ratio], ratio > 1.5 ? 'neutral' : ratio < 0.7 ? 'bear' : 'bull', ratio > 1.5 ? 'Expansion capex' : ratio < 0.7 ? 'Potential underinvestment' : 'Maintenance-like', 'Heuristic only: compares reinvestment pace vs asset consumption.'));
    }
  }
  const buyback = Math.abs(getLatest(findRowAny(cf, 'Share Buybacks', 'Common Stock Repurchased', 'Recompra')) || 0);
  const divPaid = Math.abs(getLatest(findRowAny(cf, 'Dividends Paid', 'Dividendos pagados')) || 0);
  const debtRepay = Math.abs(getLatest(findRowAny(cf, 'Debt Repaid', 'Deuda reembolsada')) || 0);
  const cashBuild = getLatest(findRowAny(cf, 'Net Change in Cash', 'Variación neta de tesorería')) || 0;
  if (fcfComputed !== null) {
    truthItems.push(makeItem('FCF Uses Summary', `FCF used for buybacks ${buyback.toFixed(0)}, dividends ${divPaid.toFixed(0)}, debt paydown ${debtRepay.toFixed(0)}, cash build ${cashBuild.toFixed(0)}`, [fcfComputed], (fcfComputed < 0 && (buyback+divPaid)>0) ? 'bear':'neutral', (fcfComputed < 0 && (buyback+divPaid)>0) ? 'Returning capital despite negative FCF' : 'Capital allocation context'));
  }
  const sbcCore = findRowAny(cf, 'Stock-Based Compensation', 'Compensación basada en acciones', 'SBC');
  if (sbcCore) {
    const sbc = Math.abs(getLatest(sbcCore) || 0);
    if (fcfComputed > 0) {
      const pct = sbc / fcfComputed * 100;
      truthItems.push(makeItem('SBC as % of FCF', `${pct.toFixed(1)}%`, [pct], pct > 30 ? 'bear' : pct > 15 ? 'neutral' : 'bull', pct > 30 ? 'High dilution cost' : 'Contained', 'Non-cash in CFO, but real cost via dilution (coste real vía dilución).', { tip: METRIC_TIPS.sbc }));
    }
    const niLatest = getLatest(niRow);
    if (niLatest > 0) {
      const pctNi = sbc / niLatest * 100;
      truthItems.push(makeItem('SBC as % of Net Income', `${pctNi.toFixed(1)}%`, [pctNi], pctNi > 20 ? 'bear' : pctNi > 10 ? 'neutral' : 'bull', pctNi > 20 ? 'Earnings quality drag' : 'Acceptable', '', { tip: METRIC_TIPS.sbc }));
    }
  }
  if (truthItems.length) results.sections.push({ id: 'cashflow-truth', title: 'Cash Flow — The Truth Serum', icon: '💧', grade: truthItems.filter(i=>i.signal==='bear').length>=2?'poor':'good', items: truthItems });

  // Valuation philosophy additions
  const valAdd = [];
  const gaapEps = findRowAny(is, ['EPS','Diluted'], ['BPA','Diluido']);
  const adjEps = findRowAny(is, 'Normalized EPS', 'Adjusted EPS', 'EPS (Normalized)', 'BPA normalizado', 'BPA ajustado');
  if (gaapEps && adjEps) {
    const g = getLatest(gaapEps), a = getLatest(adjEps);
    if (g && a) {
      const gap = ((a - g) / Math.abs(g)) * 100;
      valAdd.push(makeItem('GAAP vs Adjusted EPS Gap', `GAAP ${g.toFixed(2)} vs Adj ${a.toFixed(2)} (${gap.toFixed(1)}%)`, [gap], Math.abs(gap) > 15 ? 'bear' : 'neutral', Math.abs(gap) > 15 ? 'Large adjustment gap' : 'Close', 'Large GAAP vs adjusted gaps require validating exclusions (e.g., SBC).'));
    }
  }
  const pe = getLatest(findRowAny(vm, 'P/E', 'Price / Earnings', 'NTM P/E'));
  const pfcf = getLatest(findRowAny(vm, 'Price / Free Cash Flow', 'P/FCF'));
  const fcfYield = getLatest(findRowAny(vm, 'FCF Yield', 'Free Cash Flow Yield', 'Levered Free Cash Flow Yield'));
  const marginsWeak = (nmv.length>=2 && nmv[nmv.length-1] < nmv[0]-1.5) || (omv.length>=2 && omv[omv.length-1] < omv[0]-1.5);
  const revDown = getTrend(revVals) === 'down';
  const fcfDown = getTrend(fcfValsCore) === 'down';
  const cheap = (pe && pe < 12) || (pfcf && pfcf < 12) || (fcfYield && fcfYield > 8);
  if (cheap && (marginsWeak || revDown || fcfDown)) {
    valAdd.push(makeItem('Potential Value Trap', `Cheap multiple (${pe ? `P/E ${pe.toFixed(1)}` : pfcf ? `P/FCF ${pfcf.toFixed(1)}` : `FCF yield ${fcfYield.toFixed(1)}%`}) + weakening fundamentals`, [], 'bear', 'Possible value trap (trampa de valor)', 'Cheap valuation can be deserved when fundamentals deteriorate.'));
  }
  if (valAdd.length) results.sections.push({ id: 'valuation-philosophy', title: 'Valuation Philosophy Checks', icon: '🧮', grade: valAdd.some(i=>i.signal==='bear')?'average':'good', items: valAdd });
  // ══════════════════════════════════════════════════════════
  // OVERALL SCORE
  // ══════════════════════════════════════════════════════════
  const gradeValues = { excellent: 4, good: 3, average: 2, poor: 1 };
  const scoreKeys = Object.keys(results.scores);
  const validScores = results.sections
    .filter(sec => gradeValues[sec.grade])
    .map(sec => ({ grade: gradeValues[sec.grade], weight: avg(sec.items.map(i => i.confidence || 0.5)) || 0.5 }));
  if (validScores.length) {
    const weightedSum = validScores.reduce((s, item) => s + item.grade * item.weight, 0);
    const weightTotal = validScores.reduce((s, item) => s + item.weight, 0);
    const avgScore = weightedSum / weightTotal;
    results.overall = avgScore >= 3.5 ? 'excellent' : avgScore >= 2.5 ? 'good' : avgScore >= 1.5 ? 'average' : 'poor';
    results.overallScore = avgScore;
  }

  // Count total metrics
  results.totalMetrics = results.sections.reduce((s, sec) => s + sec.items.length, 0);

  return results;
}

// =========================================================
// RENDERER
// =========================================================
function gradeLabel(g) {
  return { excellent: t('excellent','Excellent'), good: t('good','Good'), average: t('average','Average'), poor: t('poor','Poor'), info: t('info','Info') }[g] || g;
}
function gradeBadgeClass(g) {
  return { excellent: 'badge-green', good: 'badge-blue', average: 'badge-yellow', poor: 'badge-red', info: 'badge-purple' }[g] || 'badge-blue';
}
function gradeEmoji(g) {
  return { excellent: '🟢', good: '🔵', average: '🟡', poor: '🔴' }[g] || '⚪';
}

function renderTrendBars(values, labels = []) {
  if (!values || values.length < 2) return '';
  const numeric = values.filter(v => v !== null && v !== undefined && !isNaN(v));
  if (!numeric.length) return '';
  const max = Math.max(...numeric.map(v => Math.abs(v)), 1);
  return `<div class="trend-bar">${values.map((v, i) => {
    if (v === null || v === undefined || isNaN(v)) return '<div class="bar bar-missing"></div>';
    const h = Math.max(2, (Math.abs(v) / max) * 30);
    const cls = v > 0 ? 'bar-pos' : v < 0 ? 'bar-neg' : 'bar-zero';
    const year = labels[i] || `#${i + 1}`;
    const label = `${year}: ${v.toFixed(2)}`;
    return `<button type="button" class="bar ${cls}" style="height:${h}px" title="${label}" data-point="${label}" onclick="showBarPoint(this)"></button>`;
  }).join('')}</div><div class="bar-point-view mono" data-i18n-point>${t('barNoData','No data')}</div>`;
}

function renderDashboard(data, results, industrySelection = null) {
  const d = document.getElementById('dashboard');
  const overallLabel = gradeLabel(results.overall || 'average');

  let html = `
    <div class="dash-header fade-up">
      <div>
        <h2>${data.ticker ? data.ticker + ' — ' : ''}${data.company}</h2>
        <span class="price">${data.price || ''} ${data.period ? '• ' + localizeDynamicText(data.period) : ''} • ${results.totalMetrics} ${t('metricsAnalyzed','metrics analyzed')}</span>
      </div>
      <div class="header-actions">
        <button id="toggleSectionsBtn" class="btn-toggle-sections" onclick="toggleAllSections()">${t('collapseAll','Collapse all sections')}</button>
        <button class="btn-back" onclick="goBack()">${t('newAnalysis','← New Analysis')}</button>
      </div>
    </div>
    <div class="dashboard-tabs fade-up">
      <button class="dashboard-tab active" data-tab="analysis" onclick="switchDashboardTab('analysis')">${currentLang === 'es' ? 'Análisis' : 'Analysis'}</button>
      <button class="dashboard-tab" data-tab="industry" onclick="switchDashboardTab('industry')">${currentLang === 'es' ? 'KPIs por industria' : 'Industry KPIs'}</button>
    </div>
    <div class="dashboard-panel" data-panel="analysis">
  `;

  const byId = id => results.sections.find(s => s.id === id);
  const catDefs = [
    { k:'Quality', sec:['harmony','cashflow-truth','margins','cashflow'], href:'#harmony' },
    { k:'Moat', sec:['moat','margins'], href:'#moat' },
    { k:'Financial Risk', sec:['balance','balance-composition','debt'], href:'#balance' },
    { k:'Valuation', sec:['valuation','valuation-philosophy'], href:'#valuation-philosophy' }
  ];
  html += `<div class="score-row">`;
  catDefs.forEach(cat => {
    const found = cat.sec.map(byId).filter(Boolean);
    const signals = found.flatMap(f => f.items || []);
    const bears = signals.filter(i => i.signal === 'bear').length;
    const bulls = signals.filter(i => i.signal === 'bull').length;
    const grade = bears >= 2 ? 'poor' : bulls > bears ? 'good' : 'average';
    const driver = localizeDynamicText(signals[0]?.name || 'Not enough data');
    const light = grade === 'poor' ? '🔴' : grade === 'good' ? '🟢' : '🟡';
    html += `<div class="score-card ${grade} fade-up"><div class="label">${localizeDynamicText(`2-minute ${cat.k}`)}</div><div class="value">${light} ${gradeLabel(grade)}</div><div class="detail">${driver} · <a href="${cat.href}" style="color:var(--accent)">${localizeDynamicText('see details')}</a></div></div>`;
  });
  html += `</div>`;

  const cards = [
    { label: localizeDynamicText('Overall Health'), value: overallLabel, grade: results.overall, detail: `${currentLang==='es'?'Puntuación':'Score'}: ${results.overallScore?.toFixed(1)}/4.0` },
    ...Object.entries(results.scores).map(([k, g]) => ({
      label: localizeDynamicText(k.charAt(0).toUpperCase() + k.slice(1)),
      value: gradeEmoji(g) + ' ' + gradeLabel(g),
      grade: g,
      detail: ''
    }))
  ];

  html += `<div class="score-row">`;
  cards.forEach((c, i) => {
    html += `<div class="score-card ${c.grade} fade-up delay-${Math.min(i+1, 6)}">
      <div class="label">${c.label}</div>
      <div class="value">${c.value}</div>
      ${c.detail ? `<div class="detail">${c.detail}</div>` : ''}
    </div>`;
  });
  html += `</div>`;

  results.sections.forEach((sec, si) => {
    const badgeCls = gradeBadgeClass(sec.grade);
    html += `
    <div id="${sec.id || `sec-${si}`}" class="section fade-up delay-${Math.min(si+2, 6)}">
      <div class="section-head${si < 4 ? ' open' : ''}" onclick="toggleSection(this)">
        <span style="font-size:1.2rem">${sec.icon}</span>
        <h3>${localizeDynamicText(sec.title)}</h3>
        <span class="metric-count">${sec.items.length} ${t('metricsAnalyzed','metrics analyzed')}</span>
        <span class="badge ${badgeCls}">${gradeLabel(sec.grade)}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="section-body">
        <div class="analysis-grid">
    `;
    sec.items.forEach(item => {
      const sigCls = item.signal === 'bull' ? 'signal-bull' : item.signal === 'bear' ? 'signal-bear' : item.signal === 'info' ? 'signal-info' : 'signal-neutral';
      const dotCls = item.signal === 'bull' ? 'dot-green' : item.signal === 'bear' ? 'dot-red' : item.signal === 'info' ? 'dot-blue' : 'dot-yellow';
      html += `
        <div class="a-item">
          <div>
            <div class="metric-name">${localizeDynamicText(item.name)}${item.tip ? ` <span class="tip" data-tip="${localizeDynamicText(item.tip)}">ⓘ</span>` : ''} <span class="tip" data-tip="${t('scoreConditions','Score conditions')}: ${localizeDynamicText(item.scoreRule || item.explanation || item.signalText || '')}">🏷️</span></div>
            <div class="metric-detail">${localizeDynamicText(item.detail || '')}</div>
            ${item.explanation ? `<div class="metric-values">${localizeDynamicText(item.explanation)}</div>` : ''}
            <div class="metric-values">${t('confidence','Confidence')}: ${(item.confidence * 100).toFixed(0)}%</div>
            ${renderTrendBars(item.values, item.labels || [])}
          </div>
          <div class="signal ${sigCls}">
            <span class="dot ${dotCls}"></span>
            ${localizeDynamicText(item.signalText)}
          </div>
        </div>
      `;
    });
    html += `</div></div></div>`;
  });

  html += buildSummary(data, results);
  html += `</div><div class="dashboard-panel" data-panel="industry" style="display:none">${buildIndustryPanel(data, results, industrySelection)}</div>`;
  d.innerHTML = html;
  updateToggleSectionsButton();
}


function showBarPoint(el) {
  const value = el?.dataset?.point || t('barNoData','No data');
  const container = el.closest('.a-item')?.querySelector('[data-i18n-point]');
  if (container) container.textContent = value;
}

function updateToggleSectionsButton() {
  const btn = document.getElementById('toggleSectionsBtn');
  if (!btn) return;
  const heads = Array.from(document.querySelectorAll('.section-head'));
  if (!heads.length) {
    btn.textContent = t('openAll','Open all sections');
    return;
  }
  const allOpen = heads.every(h => h.classList.contains('open'));
  btn.textContent = allOpen ? t('collapseAll','Collapse all sections') : t('openAll','Open all sections');
}

function toggleSection(headEl) {
  headEl.classList.toggle('open');
  updateToggleSectionsButton();
}

function toggleAllSections() {
  const heads = Array.from(document.querySelectorAll('.section-head'));
  if (!heads.length) return;
  const allOpen = heads.every(h => h.classList.contains('open'));
  heads.forEach(h => h.classList.toggle('open', !allOpen));
  updateToggleSectionsButton();
}

function buildSummary(data, results) {
  const includeNoise = document.getElementById('includeAnalystNoise')?.checked;
  const strengths = [];
  const risks = [];
  const highConfidence = [];
  const lowConfidence = [];

  results.sections.forEach(sec => {
    if (!includeNoise && sec.title.toLowerCase().includes('analyst')) return;
    sec.items.forEach(item => {
      if (item.signal === 'bull') strengths.push(item.name + ': ' + item.signalText);
      if (item.signal === 'bear') risks.push(item.name + ': ' + item.signalText);
      (item.confidence >= 0.66 ? highConfidence : lowConfidence).push(item.name);
    });
  });

  const harmonySec = results.sections.find(s => s.id === 'harmony');
  const harmonyVerdict = harmonySec ? (harmonySec.grade === 'poor' ? (currentLang==='es'?'⚠️ La armonía muestra desajustes relevantes.':'⚠️ Harmony has meaningful mismatches.') : harmonySec.grade === 'good' ? (currentLang==='es'?'✅ Los estados están mayormente alineados.':'✅ Statements are mostly aligned.') : (currentLang==='es'?'➖ Señales de armonía mixtas.':'➖ Mixed harmony signals.')) : (currentLang==='es'?'Datos insuficientes.':'Not enough data.');

  return `
  <div class="summary-box fade-up delay-6">
    <h4>📋 ${currentLang==='es'?'Resumen del Análisis':'Analysis Summary'} — ${data.ticker || data.company}</h4>
    <p style="margin-bottom:.5rem"><strong>${currentLang==='es'?'Veredicto de armonía':'Harmony verdict'}:</strong> ${harmonyVerdict}</p>
    <p><strong style="color:var(--green)">${currentLang==='es'?'Fortalezas principales (3)':'Top strengths (3)'}:</strong> ${strengths.length ? strengths.slice(0, 3).map(localizeDynamicText).join(' · ') : (currentLang==='es'?'No se identificaron con los datos disponibles.':'None identified from available data.')}</p>
    <p style="margin-top:.45rem"><strong style="color:var(--red)">${currentLang==='es'?'Riesgos principales (3)':'Top risks (3)'}:</strong> ${risks.length ? risks.slice(0, 3).map(localizeDynamicText).join(' · ') : (currentLang==='es'?'No se detectaron banderas rojas relevantes.':'No major red flags detected.')}</p>
    <p style="margin-top:.45rem"><strong>${currentLang==='es'?'Señales de alta confianza':'High confidence signals'}:</strong> ${highConfidence.slice(0, 6).map(localizeDynamicText).join(' · ') || (currentLang==='es'?'Limitado':'Limited')}</p>
    <p style="margin-top:.35rem"><strong>${currentLang==='es'?'Baja confianza / faltan datos':'Low confidence / missing data'}:</strong> ${lowConfidence.slice(0, 6).map(localizeDynamicText).join(' · ') || (currentLang==='es'?'Mínimo':'Minimal')}</p>
    <p style="margin-top:.75rem;font-size:.78rem;color:var(--text-dim)">
      ${currentLang==='es'?'⚠️ Herramienta de cribado. Usa siempre los informes primarios y tu propia diligencia debida.':'⚠️ Screening tool only. Use primary filings and your own due diligence.'}
    </p>
  </div>`;
}


function populateIndustrySelector() {
  const sel = document.getElementById('industrySelect');
  if (!sel || !Array.isArray(window.GICS_INDUSTRIES)) return;
  const autoLabel = currentLang === 'es' ? 'Industria: Auto (sin sesgo)' : 'Industry: Auto (no bias)';
  const current = sel.value || 'auto';
  sel.innerHTML = [`<option value="auto">${autoLabel}</option>`]
    .concat(window.GICS_INDUSTRIES.slice().sort((a, b) => a.code.localeCompare(b.code)).map(i => `<option value="${i.code}">${i.code} · ${i.name}</option>`))
    .join('');
  sel.value = current;
}

function getIndustrySelection() {
  const code = document.getElementById('industrySelect')?.value || 'auto';
  if (code === 'auto') return null;
  return window.GICS_INDUSTRIES?.find(i => i.code === code) || null;
}

function normalizeSimple(v) {
  return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function buildAvailabilityIndex(data, results) {
  const labels = [];
  Object.values(data.sections || {}).forEach(sec => (sec?.rows || []).forEach(r => labels.push(r.label)));
  (results.sections || []).forEach(sec => (sec.items || []).forEach(i => labels.push(i.name)));
  const clean = labels.map(normalizeSimple).filter(Boolean);
  return { blob: clean.join(' | ') };
}

function hasAny(index, terms) {
  return terms.some(term => index.blob.includes(normalizeSimple(term)));
}

function isKpiAvailable(kpi, index) {
  const k = normalizeSimple(kpi);
  const rules = [
    { terms: ['fcf', 'free cash flow', 'cash conversion', 'cfo'], match: ['free cash flow', 'cash from operations', 'operating cash flow', 'fcf'] },
    { terms: ['margin', 'gross margin', 'ebitda'], match: ['gross margin', 'operating margin', 'ebitda margin', 'gross profit', 'operating income'] },
    { terms: ['working capital'], match: ['current assets', 'current liabilities', 'accounts receivable', 'inventory', 'accounts payable'] },
    { terms: ['inventory'], match: ['inventory', 'inventories'] },
    { terms: ['debt', 'leverage', 'net debt'], match: ['net debt', 'long-term debt', 'short-term borrowings', 'total liabilities'] },
    { terms: ['roic', 'roe', 'roa'], match: ['roic', 'roe', 'roa', 'return on'] },
    { terms: ['revenue', 'volume', 'price mix', 'asp'], match: ['revenue', 'ingresos', 'price / sales'] },
    { terms: ['book value', 'p b', 'p tbv'], match: ['book value', 'tangible book', 'price / book'] },
    { terms: ['nim', 'npl', 'cet1', 'ldr'], match: ['interest expense', 'allowance', 'book value', 'loan'] },
    { terms: ['capex'], match: ['capital expenditures', 'capex', 'property plant'] }
  ];
  for (const rule of rules) {
    if (rule.terms.some(t => k.includes(normalizeSimple(t)))) return hasAny(index, rule.match);
  }
  const tokens = k.split(' ').filter(w => w.length >= 4);
  return tokens.some(tok => index.blob.includes(tok));
}

function buildIndustryPanel(data, results, industry) {
  if (!industry) {
    return `<div class="industry-empty">${currentLang === 'es' ? 'No seleccionaste una industria concreta. Selecciónala en la pantalla inicial para activar heurísticas GICS.' : 'No industry selected. Pick one on landing to activate GICS heuristics.'}</div>`;
  }
  const profile = window.INDUSTRY_PROFILES?.[industry.profile];
  if (!profile) return '';

  const index = buildAvailabilityIndex(data, results);
  const valuation = profile.valuation.split('·').map(v => v.trim()).filter(Boolean);
  const valuationAvailable = valuation.filter(v => isKpiAvailable(v, index));
  const kpis = profile.kpis.split(',').map(k => k.trim()).filter(Boolean);
  const availableKpis = kpis.filter(k => isKpiAvailable(k, index));

  return `<div class="industry-panel fade-up">
    <div class="industry-head">
      <h3>${industry.code} · ${industry.name}</h3>
      <p>${currentLang === 'es' ? 'Perfil heurístico' : 'Heuristic profile'}: <strong>${industry.profile}</strong></p>
    </div>
    <div class="industry-grid">
      <div class="industry-card">
        <h4>${currentLang === 'es' ? 'Múltiplos a priorizar (disponibles)' : 'Priority valuation metrics (available)'}</h4>
        <ul>${valuationAvailable.length ? valuationAvailable.map(v => `<li>${v}</li>`).join('') : `<li>${currentLang === 'es' ? 'Sin cobertura con este input.' : 'No coverage with current input.'}</li>`}</ul>
      </div>
      <div class="industry-card">
        <h4>${currentLang === 'es' ? 'KPIs relevantes detectados' : 'Detected relevant KPIs'}</h4>
        ${availableKpis.length ? `<ul>${availableKpis.map(k => `<li><strong>${k}</strong> — ${currentLang === 'es' ? 'Relevante para esta industria.' : 'Relevant for this industry.'}</li>`).join('')}</ul>` : `<p>${currentLang === 'es' ? 'No hay KPIs detectables con los datos cargados. (No se muestran los no disponibles).' : 'No profile KPIs were detectable from the uploaded financials. (Unavailable KPIs are hidden).'}</p>`}
      </div>
    </div>
  </div>`;
}

function switchDashboardTab(tab) {
  document.querySelectorAll('.dashboard-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
  document.querySelectorAll('.dashboard-panel').forEach(panel => {
    panel.style.display = panel.dataset.panel === tab ? 'block' : 'none';
  });
}

// =========================================================
// MAIN
// =========================================================
function showDashboard() {
  document.getElementById('landing').style.display = 'none';
  const d = document.getElementById('dashboard');
  d.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLanding() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('landing').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  // optional: keep previous pasted text; if you want to clear it, uncomment next line
  // document.getElementById('dataInput').value = '';
  document.getElementById('dashboard').innerHTML = '';
  showLanding();
}

// Profile UI toggle
function syncCustomProfileUI() {
  const sel = document.getElementById('profileSelect');
  const wrap = document.getElementById('customProfileWrap');
  wrap.style.display = sel.value === 'custom' ? 'block' : 'none';
}

// Run once on load
document.addEventListener('DOMContentLoaded', () => {
  syncCustomProfileUI();
  populateIndustrySelector();
  const langSel = document.getElementById('langSelect');
  if (langSel) {
    langSel.value = currentLang;
    langSel.addEventListener('change', (e) => setLanguage(e.target.value));
  }
  applyLocalization();
  document.getElementById('profileSelect')?.addEventListener('change', syncCustomProfileUI);

  // QoL: Ctrl/Cmd + Enter triggers analyze
  document.getElementById('dataInput')?.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') analyzeData();
  });
});

function analyzeData() {
  const raw = document.getElementById('dataInput').value.trim();
  const errEl = document.getElementById('error-msg');
  errEl.style.display = 'none';
  errEl.textContent = '';

  if (!raw || raw.length < 100) {
    errEl.textContent = currentLang === 'es' ? 'Pega todos los datos financieros de TIKR (parecen demasiado cortos).' : 'Please paste the full TIKR financial data (it seems too short).';
    errEl.style.display = 'block';
    return;
  }

  try {
    const data = parseTIKR(raw);

    // Basic sanity: did we actually parse any table rows?
    const secCount = Object.keys(data.sections || {}).length;
    const rowCount = Object.values(data.sections || {}).reduce((s, sec) => s + (sec?.rows?.length || 0), 0);

    if (secCount === 0 || rowCount === 0) {
      errEl.textContent = currentLang === 'es'
        ? 'No se detectaron tablas TIKR. Asegúrate de pegar tablas markdown (líneas que empiezan por "|"), incluyendo cabecera con fechas.'
        : 'No TIKR tables detected. Make sure you pasted the markdown tables (lines starting with "|") including the header row with dates.';
      errEl.style.display = 'block';
      return;
    }

    const selected = document.getElementById('profileSelect').value;

    let customThresholds = null;
    let engineProfile = selected;

    if (selected === 'custom') {
      customThresholds = parseCustomProfile();
      if (!customThresholds) {
        errEl.textContent = currentLang === 'es' ? 'El JSON del perfil personalizado es inválido. Corrígelo e inténtalo de nuevo.' : 'Custom profile JSON is invalid. Fix the JSON and try again.';
        errEl.style.display = 'block';
        return;
      }
      // Use default profile logic + override thresholds
      engineProfile = 'default';
    }

    const results = analyze(data, engineProfile, { customThresholds });
    const industrySelection = getIndustrySelection();
    renderDashboard(data, results, industrySelection);
    showDashboard();
  } catch (e) {
    console.error(e);
    errEl.textContent = currentLang === 'es' ? 'Falló el parseo/análisis. Abre la consola DevTools para ver más detalles.' : 'Parsing/analyzing failed. Open DevTools console for details.';
    errEl.style.display = 'block';
  }
}
