import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, CartesianGrid, ZAxis } from "recharts";

const COLORS = ["#1e3a5f","#2563eb","#0891b2","#059669","#d97706","#dc2626","#7c3aed","#db2777","#64748b","#0d9488"];

const Section = ({id, title, children}) => (
  <div id={id} className="mb-10">
    <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-2 mb-5">{title}</h2>
    {children}
  </div>
);

const SubSection = ({title, children}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-slate-700 mb-3">{title}</h3>
    {children}
  </div>
);

const KPI = ({label, value, sub}) => (
  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200 text-center">
    <div className="text-2xl font-bold text-blue-700">{value}</div>
    <div className="text-sm font-medium text-slate-600 mt-1">{label}</div>
    {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
  </div>
);

const Table = ({headers, rows, compact=false}) => (
  <div className="overflow-x-auto mb-4">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>{headers.map((h,i) => <th key={i} className={`bg-slate-700 text-white ${compact?'px-2 py-1.5':'px-3 py-2'} text-left font-medium border border-slate-600`}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row,i) => (
          <tr key={i} className={i%2===0?'bg-white':'bg-slate-50'}>
            {row.map((cell,j) => <td key={j} className={`${compact?'px-2 py-1':'px-3 py-2'} border border-slate-200 text-slate-700`}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Callout = ({type="info", children}) => {
  const styles = {info:"bg-blue-50 border-blue-400 text-blue-800", warning:"bg-amber-50 border-amber-400 text-amber-800", success:"bg-green-50 border-green-400 text-green-800"};
  return <div className={`border-l-4 ${styles[type]} p-4 rounded-r-lg mb-4 text-sm`}>{children}</div>;
};

export default function MarketStudy() {
  const [tab, setTab] = useState("exec");

  const globalShare = [
    {name:"Samsung",value:19.0},{name:"Apple",value:18.2},{name:"Xiaomi",value:13.5},{name:"Transsion",value:9.0},{name:"vivo",value:8.9},{name:"OPPO",value:7.5},{name:"Honor",value:5.2},{name:"Huawei",value:4.8},{name:"Motorola",value:4.5},{name:"Otros",value:9.4}
  ];

  const colombiaShare = [
    {name:"Apple",value:34.3},{name:"Samsung",value:21.6},{name:"Xiaomi",value:14.9},{name:"Motorola",value:11.7},{name:"OPPO",value:3.2},{name:"Huawei",value:2.8},{name:"Tecno",value:2.5},{name:"Otros",value:9.0}
  ];

  const colombiaShipments = [
    {name:"Samsung",shipments:22},{name:"Motorola",shipments:16},{name:"Xiaomi",shipments:14},{name:"Apple",shipments:12},{name:"TECNO",shipments:10},{name:"OPPO",shipments:8},{name:"Huawei",shipments:5},{name:"Honor",shipments:4},{name:"Otros",shipments:9}
  ];

  const porterData = [
    {subject:"Poder proveedores",A:75},{subject:"Poder compradores",A:70},{subject:"Amenaza sustitutos",A:40},{subject:"Amenaza entrantes",A:55},{subject:"Rivalidad competitiva",A:90}
  ];

  const impactMatrix = [
    {x:90,y:30,z:200,name:"Alianzas con operadores"},
    {x:75,y:40,z:180,name:"Segmento gaming"},
    {x:60,y:60,z:160,name:"IA on-device"},
    {x:85,y:50,z:140,name:"Serie mid-range 5G"},
    {x:50,y:70,z:120,name:"Plegables accesibles"},
    {x:70,y:25,z:170,name:"Posventa localizada"},
    {x:40,y:80,z:100,name:"Marca premium"},
  ];

  const sections = [
    {id:"exec",label:"Resumen Ejecutivo"},
    {id:"tam",label:"TAM / SAM / SOM"},
    {id:"trends",label:"Tendencias"},
    {id:"segmentation",label:"Segmentación"},
    {id:"competitors",label:"Competidores"},
    {id:"porter",label:"5 Fuerzas Porter"},
    {id:"barriers",label:"Barreras y Riesgos"},
    {id:"zte",label:"Foco ZTE"},
    {id:"recs",label:"Recomendaciones"}
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs tracking-widest text-blue-300 mb-2 uppercase">Estudio de mercado estratégico</div>
          <h1 className="text-3xl font-bold mb-2">Industria de Teléfonos Celulares</h1>
          <div className="text-blue-200 text-lg">Colombia & Global — Foco en ZTE Corporation</div>
          <div className="flex gap-6 mt-4 text-xs text-slate-300">
            <span>Febrero 2026</span>
            <span>Fuentes: IDC, Counterpoint, Canalys, StatCounter, Statista, Grand View Research, informes corporativos ZTE</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="flex gap-1 py-2 px-2">
            {sections.map(s => (
              <button key={s.id} onClick={() => {setTab(s.id); document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'});}}
                className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${tab===s.id?'bg-blue-600 text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* 1. RESUMEN EJECUTIVO */}
        <Section id="exec" title="1. Resumen Ejecutivo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <KPI label="Mercado global 2024" value="$520 Bn" sub="Revenue (Grand View Research)" />
            <KPI label="Envíos globales 2024" value="1.24 Bn" sub="Unidades (IDC)" />
            <KPI label="CAGR Global 2025-2030" value="3.9%" sub="Ingresos (Grand View Research)" />
            <KPI label="Mercado Colombia 2024" value="~$3.6 Bn" sub="Revenue (Statista)" />
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            El mercado global de smartphones alcanzó <strong>$520.5 mil millones en ingresos</strong> y <strong>1.24 mil millones de unidades</strong> enviadas en 2024, registrando un crecimiento del 6.4% interanual tras dos años consecutivos de caída. En 2025 el crecimiento se moderó al 2%, llegando a 1.25 mil millones de unidades. Samsung y Apple se disputan el liderazgo global con ~19-20% cada uno, seguidos de Xiaomi (13.5%), Transsion (9%) y vivo (8.9%). La "premiumización" y la integración de IA generativa on-device son los dos macro-drivers del ciclo actual.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            En <strong>Colombia</strong>, el mercado se estimó en ~$3.6 mil millones en 2024 con un CAGR proyectado de 2.5% hasta 2029. Los envíos crecieron 27% interanual en Q1 2024 impulsados por financiamiento de operadores y estabilización del peso colombiano. <strong>Apple lidera en uso (34.3% de tráfico web), Samsung domina en envíos (22% de unidades)</strong>, seguidos de Xiaomi, Motorola y marcas Transsion que penetran rápidamente el segmento de entrada.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            <strong>ZTE Corporation</strong>, con ingresos totales de RMB 121.3 mil millones en 2024 (+14.5% en H1 2025), está ejecutando una agresiva expansión internacional de su negocio de dispositivos bajo la estrategia dual "ZTE + nubia". Los envíos de smartphones al exterior crecieron +60% interanual desde 2024, con Latinoamérica como una de las regiones foco. Su cuota global en smartphones es aún modesta (~2.4%), pero su posición como #2 mundial en infraestructura 5G y líder en FWA le otorga ventajas de canal únicas para penetrar operadores.
          </p>
          <Callout type="info">
            <strong>Tesis central:</strong> ZTE tiene una oportunidad de nicho en Colombia apalancando sus relaciones existentes con operadores (infraestructura 5G), posicionando dispositivos mid-range con IA y gaming a precios competitivos, en un mercado donde la fragmentación está en aumento y las marcas entrantes (Transsion, Honor) demuestran que hay espacio para nuevos jugadores.
          </Callout>
        </Section>

        {/* 2. TAM/SAM/SOM */}
        <Section id="tam" title="2. TAM, SAM, SOM y CAGR">
          <SubSection title="Mercado Global">
            <Table headers={["Métrica","Valor 2024","Proyección","CAGR","Fuente"]}
              rows={[
                ["TAM (Ingresos globales smartphones)","$520.5 Bn","$651.8 Bn (2030)","3.9%","Grand View Research"],
                ["TAM (Unidades globales)","1.24 Bn uds","~1.35 Bn (2030)","~1.5%","IDC / Counterpoint"],
                ["SAM (Segmento mid-range $150-$500)","~$244 Bn (~47% del mercado)","~$310 Bn (2030)","~4.1%","Estimación triangulada"],
                ["SOM ZTE Global (smartphones)","~$3.8 Bn (2.4% cuota)","~$6-8 Bn (2028e)","~15-20%","Yahoo Finance / ZTE"],
              ]}
            />
          </SubSection>
          <SubSection title="Mercado Colombia">
            <Table headers={["Métrica","Valor 2024","Proyección","CAGR","Fuente"]}
              rows={[
                ["TAM Colombia (Revenue)","~$3.6 Bn","~$4.0 Bn (2029)","2.5%","Statista"],
                ["TAM Colombia (Unidades)","~11.5 M uds","~11.6 M (2029)","~0.2%","Statista"],
                ["SAM (Mid-range + Entry-level)","~$2.2 Bn (~60% del mercado)","~$2.5 Bn (2029)","~2.8%","Estimación"],
                ["SOM potencial ZTE Colombia","~$15-25 M (entrante)","~$50-80 M (2028e)","—","Análisis propio"],
              ]}
            />
          </SubSection>
          <SubSection title="CAGR comparado por segmento">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  {seg:"Premium >$600",global:5.2,latam:6.8},
                  {seg:"Mid-range $200-600",global:4.1,latam:3.5},
                  {seg:"Entry <$200",global:2.0,latam:2.8},
                  {seg:"Plegables",global:18.5,latam:22.0},
                  {seg:"5G habilitados",global:8.3,latam:12.0},
                ]} margin={{left:10,right:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                  <XAxis dataKey="seg" tick={{fontSize:11}} angle={-15} textAnchor="end" height={50}/>
                  <YAxis tick={{fontSize:11}} unit="%"/>
                  <Tooltip formatter={(v)=>`${v}%`}/>
                  <Legend wrapperStyle={{fontSize:12}}/>
                  <Bar dataKey="global" name="CAGR Global 25-30" fill="#2563eb" radius={[4,4,0,0]}/>
                  <Bar dataKey="latam" name="CAGR LATAM 25-30" fill="#0891b2" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-1">Fuentes: Grand View Research, Market Data Forecast, IDC. CAGR de plegables y 5G son los más dinámicos.</p>
          </SubSection>
        </Section>

        {/* 3. TENDENCIAS */}
        <Section id="trends" title="3. Tendencias Clave del Mercado">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              {t:"IA Generativa On-Device", d:"46% de nuevos modelos en 2024 integraron funciones de IA (cámaras, asistentes, traducción). Samsung Galaxy AI, Google Gemini y Apple Intelligence lideran. Marcas chinas como Xiaomi y ZTE integran LLMs en dispositivos mid-range."},
              {t:"Premiumización sostenida", d:"Dispositivos >$600 representan 25% de unidades pero >50% de ingresos. El ASP global subió 5% a $345 en Q2 2024. El ciclo de reemplazo se acorta a 2.7 años gracias a innovación en pantalla y procesador."},
              {t:"5G como estándar", d:"64% de envíos globales en 2024 fueron 5G. En Colombia, 23% de envíos en Q3 2024 fueron 5G, creciendo 4x vs LTE. Los operadores Claro y Tigo están expandiendo cobertura activamente."},
              {t:"Plegables en ascenso", d:"Envíos de foldables crecieron 62% en 2024 a +20M de unidades. Samsung lidera, pero Huawei y marcas chinas como ZTE (nubia Flip) están democratizando precios desde $599."},
              {t:"Fragmentación en emergentes", d:"Transsion (Tecno, Infinix) creció 85% interanual. En Colombia, TECNO alcanzó 10% de cuota de envíos en Q1 2024. Las marcas establecidas pierden concentración."},
              {t:"E-commerce como canal", d:"El canal online en LATAM crece a CAGR de 13.8%. MercadoLibre, Falabella y tiendas propias de marcas ganan relevancia vs operadores tradicionales."},
            ].map((item,i) => (
              <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="font-semibold text-slate-800 text-sm mb-1">{item.t}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{item.d}</div>
              </div>
            ))}
          </div>
          <Callout type="warning">
            <strong>Riesgo 2026:</strong> Se anticipa una contracción de ~3% en el mercado global por escasez de DRAM y NAND, lo que elevará costos de componentes y presionará los márgenes de dispositivos de gama media-baja.
          </Callout>
        </Section>

        {/* 4. SEGMENTACIÓN */}
        <Section id="segmentation" title="4. Segmentación del Mercado">
          <SubSection title="4.1 Por rango de precio (Global 2024)">
            <Table headers={["Segmento","Rango de precio","% de unidades","% de ingresos","Dinámica clave"]}
              rows={[
                ["Ultra-premium",">$1,000","~10%","~25%","Apple iPhone Pro, Samsung S Ultra. Márgenes altos. Crecimiento 12%."],
                ["Premium","$600–$1,000","~15%","~28%","Galaxy S24, iPhone 16. IA y cámaras avanzadas."],
                ["Mid-range","$200–$600","~47%","~35%","Mayor volumen. Samsung A-series, Xiaomi, Motorola G."],
                ["Entry-level","<$200","~28%","~12%","Transsion, Xiaomi Redmi, ZTE Blade. Mercados emergentes."],
              ]}
            />
          </SubSection>
          <SubSection title="4.2 Por sistema operativo (Global 2024)">
            <div className="flex gap-8 items-center mb-4">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{name:"Android",value:61.4},{name:"iOS",value:38.6}]} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({name,value})=>`${name}: ${value}%`} labelLine={false}>
                      <Cell fill="#059669"/><Cell fill="#1e3a5f"/>
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-sm text-slate-600">
                <p className="mb-2"><strong>Android 61.4%:</strong> Dominante en volumen, impulsado por la diversidad de fabricantes (Samsung, Xiaomi, OPPO, vivo, Transsion, ZTE).</p>
                <p><strong>iOS 38.6%:</strong> Concentrado en mercados premium. Genera más de 50% del revenue global por mayor ASP.</p>
              </div>
            </div>
          </SubSection>
          <SubSection title="4.3 Por región (% de envíos globales 2024)">
            <Table headers={["Región","% Envíos","Dinámica","Marcas líderes"]}
              rows={[
                ["Asia-Pacífico","~47%","Mayor volumen. China + India = motores principales.","Samsung, Xiaomi, vivo, OPPO, Huawei"],
                ["Europa","~18%","Mercado maduro de reemplazo. Ciclo 3-4 años.","Samsung, Apple, Xiaomi"],
                ["Norteamérica","~12%","Altamente premium. Apple 58% en EE.UU.","Apple, Samsung, Google"],
                ["LATAM","~9%","Recuperación post-pandemia +15% en 2024.","Samsung (32.4%), Motorola (16.2%), Apple (15.8%), Xiaomi (13.7%)"],
                ["Medio Oriente y África","~14%","Mayor crecimiento potencial. Transsion domina.","Transsion, Samsung, Xiaomi"],
              ]}
            />
          </SubSection>
          <SubSection title="4.4 Mercado Colombia — Cuota por marca">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-2 font-medium">Cuota de uso web (StatCounter, Enero 2026)</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={colombiaShare} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,value})=>`${name} ${value}%`}>
                        {colombiaShare.map((e,i) => <Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                      </Pie>
                      <Tooltip formatter={(v)=>`${v}%`}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2 font-medium">Cuota de envíos Q1 2024 (Counterpoint)</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={colombiaShipments} layout="vertical" margin={{left:60}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                      <XAxis type="number" unit="%" tick={{fontSize:11}}/>
                      <YAxis dataKey="name" type="category" tick={{fontSize:11}}/>
                      <Tooltip formatter={(v)=>`${v}%`}/>
                      <Bar dataKey="shipments" name="% Envíos" fill="#2563eb" radius={[0,4,4,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <Callout type="info">
              <strong>Divergencia clave:</strong> Apple lidera en tráfico (usuarios premium más activos), pero Samsung lidera en unidades vendidas. Motorola y TECNO son los de mayor crecimiento en volumen. ZTE no aparece aún en el top 8 de Colombia.
            </Callout>
          </SubSection>
        </Section>

        {/* 5. COMPETIDORES */}
        <Section id="competitors" title="5. Análisis de los 10 Principales Competidores">
          <SubSection title="5.1 Cuota global (Q3 2025, unidades enviadas — IDC / Counterpoint / TechInsights)">
            <div className="h-72 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={globalShare}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                  <XAxis dataKey="name" tick={{fontSize:11}} angle={-30} textAnchor="end" height={50}/>
                  <YAxis tick={{fontSize:11}} unit="%"/>
                  <Tooltip formatter={(v)=>`${v}%`}/>
                  <Bar dataKey="value" name="Cuota global %" fill="#1e3a5f" radius={[4,4,0,0]}>
                    {globalShare.map((e,i) => <Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SubSection>

          <SubSection title="5.2 Perfil estratégico de los 10 principales competidores">
            <Table compact headers={["#","Marca","Cuota global","Presencia Colombia","Propuesta de valor","Ventaja competitiva clave"]}
              rows={[
                ["1","Samsung","19-20%","Líder en envíos (22%)","Portafolio completo: Galaxy S (premium), A (mid), M (entry). Líder en plegables.","Mayor red de distribución y posventa global. Integración vertical (chips Exynos, pantallas AMOLED)."],
                ["2","Apple","18-20%","Líder en uso (34%)","Ecosistema cerrado iOS + servicios. Apple Intelligence IA.","Márgenes superiores (>40%). Lealtad de marca extrema. Control total hardware/software."],
                ["3","Xiaomi","13-14%","3° (14.9% uso)","Relación precio-especificaciones imbatible. Redmi (entry) + Xiaomi (mid/premium).","Modelo DTC online, ecosistema IoT masivo, chip propio XRING. Márgenes ajustados compensados por volumen."],
                ["4","Transsion","9%","~10% envíos (TECNO)","Ultra-accesibles para mercados emergentes. Tecno, Infinix, itel.","Localización extrema (cámaras para tonos de piel oscuros, dual-SIM). Domina África."],
                ["5","vivo","8-9%","Marginal","Fotografía y carga rápida (100W). iQOO sub-marca gaming.","Fuerte en India y China. Integración vertical con lentes Zeiss."],
                ["6","OPPO","7-8%","~3% uso","Cámara y diseño premium mid-range. Reno series. Sub-marcas: OnePlus, Realme.","I+D en carga rápida VOOC. ColorOS diferenciado. Amplio portafolio sub-marcas."],
                ["7","Honor","5%","Entrante","Ex-submarca Huawei, ahora independiente. Magic series con IA.","Hereda I+D de Huawei sin restricciones de sanciones. Crecimiento agresivo en Europa/LATAM."],
                ["8","Huawei","4-5%","~2.8% uso","HarmonyOS propio. Liderazgo en plegables premium en China.","I+D masiva, chips Kirin propios. Ecosistema propio sin dependencia de Google."],
                ["9","Motorola","4-5%","4° (11.7% uso)","Moto G (mid-range icónico). Edge (premium). Razr (plegable accesible).","Marca con alta confianza en LATAM. Distribución fuerte con operadores. Propiedad de Lenovo."],
                ["10","ZTE/nubia","~2.4%","<1% (entrante)","nubia (gaming/fotografía), RedMagic (#1 gaming global), Blade (entry).","#2 global en infraestructura 5G. Relaciones profundas con operadores. 20% del revenue en I+D."],
              ]}
            />
          </SubSection>
        </Section>

        {/* 6. PORTER */}
        <Section id="porter" title="6. Análisis de las 5 Fuerzas de Porter">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={porterData}>
                  <PolarGrid stroke="#cbd5e1"/>
                  <PolarAngleAxis dataKey="subject" tick={{fontSize:11}}/>
                  <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fontSize:10}}/>
                  <Radar name="Intensidad" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25}/>
                  <Tooltip/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm space-y-3">
              {[
                {f:"Rivalidad competitiva",score:"MUY ALTA (90/100)",d:"Top 5 marcas concentran 72% del mercado pero compiten ferozmente en precio, IA y cámaras. Guerras de subsidios en operadores."},
                {f:"Poder de proveedores",score:"ALTO (75/100)",d:"Concentración en chips (Qualcomm, MediaTek, Apple), pantallas (Samsung Display, BOE) y memoria (Samsung, SK Hynix). Escasez de DRAM/NAND anticipada para 2026."},
                {f:"Poder de compradores",score:"ALTO (70/100)",d:"Consumidores informados con alta sensibilidad al precio en LATAM. Bajos costos de cambio entre marcas Android. Lealtad concentrada solo en Apple."},
                {f:"Amenaza de nuevos entrantes",score:"MODERADA (55/100)",d:"Barreras técnicas altas pero Transsion y Honor demuestran que es posible entrar con estrategia de nicho + precio. ZTE tiene ventaja por infraestructura existente."},
                {f:"Amenaza de sustitutos",score:"BAJA (40/100)",d:"No existe sustituto real del smartphone. Wearables y tablets son complementos, no reemplazos. El ciclo de reemplazo se extiende pero no elimina la demanda."},
              ].map((item,i) => (
                <div key={i}>
                  <div className="font-semibold text-slate-800">{item.f}: <span className="text-blue-600">{item.score}</span></div>
                  <div className="text-xs text-slate-600">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 7. BARRERAS Y RIESGOS */}
        <Section id="barriers" title="7. Barreras de Entrada, Riesgos y Oportunidades">
          <SubSection title="7.1 Barreras de entrada al mercado colombiano">
            <Table headers={["Barrera","Nivel","Descripción"]}
              rows={[
                ["Distribución y canal","ALTO","Dominancia de operadores (Claro, Movistar, Tigo) que requieren negociaciones complejas y subsidios. 52% de ventas son retail físico."],
                ["Reconocimiento de marca","ALTO","Samsung y Apple tienen décadas de presencia. Generar confianza requiere inversión significativa en marketing local."],
                ["Red de posventa","MEDIO-ALTO","Servicio técnico y garantía local es diferenciador creciente. Requiere inversión en centros de servicio autorizados."],
                ["Regulación (homologación)","MEDIO","Certificación ante CRC/ANE para cada modelo. Proceso de meses que requiere representación legal local."],
                ["Tipo de cambio","MEDIO","Volatilidad del COP afecta márgenes de importación. El peso se estabilizó en 2024 (~3,800-3,900/USD) pero sigue siendo riesgo."],
                ["Escala mínima","MEDIO","Necesidad de volúmenes mínimos para justificar logística, soporte e inventario en el país."],
              ]}
            />
          </SubSection>
          <SubSection title="7.2 Riesgos estratégicos">
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {r:"Geopolítico",d:"Sanciones de EE.UU. (antecedente ZTE 2018). Restricciones potenciales sobre tecnología china en LATAM. FCC ya limita a ZTE en EE.UU."},
                {r:"Competencia de precios",d:"Guerra de precios entre Xiaomi, Transsion y Motorola comprime márgenes en el segmento entry/mid. Difícil diferenciarse solo por precio."},
                {r:"Componentes 2026",d:"Escasez de DRAM/NAND elevará costos. Marcas sin escala sufrirán más. ZTE mitiga parcialmente con integración vertical limitada."},
                {r:"Percepción de marca",d:"ZTE asociada a infraestructura telecom, no a consumer. Requiere inversión en reposicionamiento. nubia es desconocida en Colombia."},
              ].map((item,i) => (
                <div key={i} className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <div className="font-semibold text-red-800 text-sm">{item.r}</div>
                  <div className="text-xs text-red-700 mt-1">{item.d}</div>
                </div>
              ))}
            </div>
          </SubSection>
          <SubSection title="7.3 Oportunidades estratégicas">
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {o:"Canal operadores 5G",d:"ZTE provee infraestructura 5G a operadores en LATAM. Oportunidad de bundling: 'compra la red Y los dispositivos'. Modelo probado en Asia."},
                {o:"Segmento gaming (RedMagic)",d:"#1 global en gaming phones. Colombia tiene 22M+ gamers. Nicho sub-atendido por Samsung/Apple. Entry point diferenciado."},
                {o:"IA accesible (AI for All)",d:"Dispositivos mid-range con IA cuando competidores la reservan para premium. Ventaja de timing en democratización."},
                {o:"Plegables accesibles",d:"nubia Flip desde $599 vs Samsung Z Flip >$1,000. Primer foldable asequible para consumidores colombianos."},
                {o:"E-commerce LATAM",d:"Canal online crece 13.8% CAGR. MercadoLibre como plataforma de lanzamiento sin necesidad de retail físico masivo."},
                {o:"Servicio posventa diferenciado",d:"Apalancar la red de servicio de infraestructura ZTE existente para ofrecer soporte local. Samsung tiene 500+ centros en LATAM como benchmark."},
              ].map((item,i) => (
                <div key={i} className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="font-semibold text-green-800 text-sm">{item.o}</div>
                  <div className="text-xs text-green-700 mt-1">{item.d}</div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* 8. FOCO ZTE */}
        <Section id="zte" title="8. Perfil Estratégico de ZTE Corporation">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <KPI label="Ingresos totales 2024" value="RMB 121.3 Bn" sub="~$16.7 Bn USD"/>
            <KPI label="Negocio consumer 2024" value="RMB 32.4 Bn" sub="26.7% del total, +16.1% YoY"/>
            <KPI label="Inversión I+D" value="~20%" sub="Del revenue total. ~94K patentes"/>
            <KPI label="Empleados" value="68,214" sub="Al 30 Jun 2024"/>
          </div>

          <SubSection title="8.1 Segmentos de negocio ZTE (2024)">
            <Table headers={["Segmento","Revenue (RMB Bn)","% Total","Crecimiento YoY","Nota"]}
              rows={[
                ["Redes de Operadores","70.33","58.0%","Presión por ciclo 5G maduro","#2 global en base stations 5G y core 5G"],
                ["Gobierno y Empresa","18.56","15.3%","+36.7%","Segmento de mayor crecimiento. Intelligent computing."],
                ["Consumer (terminales)","32.41","26.7%","+16.1%","Smartphones +40% YoY. Home terminals >100M uds. RedMagic #1 gaming global."],
              ]}
            />
          </SubSection>

          <SubSection title="8.2 Estrategia de terminales: ZTE + nubia dual-brand">
            <Table headers={["Marca","Posicionamiento","Productos clave","Mercados foco","Precio rango"]}
              rows={[
                ["ZTE (marca madre)","Accesible, carrier-friendly","Blade series, Yuanhang series","LATAM, Asia, Operadores","$100–$300"],
                ["nubia","Fotografía premium, lifestyle","Z series (flagship), Focus (cámara), Flip (plegable)","Europa, LATAM, SEA","$300–$800"],
                ["RedMagic","Gaming extremo","RedMagic 11 Pro series","Global (e-commerce)","$400–$1,200"],
              ]}
            />
          </SubSection>

          <SubSection title="8.3 FODA de ZTE en el mercado colombiano">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="font-bold text-blue-800 mb-2">Fortalezas</div>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• #2 global en infraestructura 5G — relaciones con operadores LATAM</li>
                  <li>• 20% del revenue en I+D — capacidad de innovación comprobada</li>
                  <li>• Portafolio diversificado: entry (Blade), mid (nubia Focus), gaming (RedMagic)</li>
                  <li>• Envíos internacionales de smartphones +60% YoY en 2024</li>
                  <li>• Líder #1 global en FWA por 4 años consecutivos</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="font-bold text-amber-800 mb-2">Debilidades</div>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• Cuota global de smartphones marginal (~2.4%)</li>
                  <li>• Marca consumer desconocida en Colombia</li>
                  <li>• Sin red de posventa local para dispositivos</li>
                  <li>• Historial de sanciones (2018) afecta percepción de confiabilidad</li>
                  <li>• 67.6% de ingresos dependientes de China</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="font-bold text-green-800 mb-2">Oportunidades</div>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Fragmentación creciente del mercado colombiano (TECNO logró 10% rápidamente)</li>
                  <li>• 5G expandiéndose — dispositivos 5G accesibles tienen alta demanda</li>
                  <li>• Nicho gaming sin líder claro en Colombia</li>
                  <li>• E-commerce LATAM creciendo 13.8% CAGR como canal de entrada</li>
                  <li>• Dual-brand permite atacar múltiples segmentos simultáneamente</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="font-bold text-red-800 mb-2">Amenazas</div>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>• Riesgo geopolítico y sanciones recurrentes sobre tech china</li>
                  <li>• Competencia feroz de Xiaomi/Transsion en precios bajos</li>
                  <li>• Samsung y Apple con inercia de marca muy fuerte</li>
                  <li>• Escasez de componentes 2026 presionaría márgenes</li>
                  <li>• Honor también está expandiéndose agresivamente en LATAM</li>
                </ul>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* 9. RECOMENDACIONES */}
        <Section id="recs" title="9. Recomendaciones Estratégicas Priorizadas (Impacto vs. Dificultad)">
          <SubSection title="9.1 Matriz de priorización">
            <div className="h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{top:20,right:20,bottom:40,left:40}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                  <XAxis dataKey="x" name="Impacto" unit="" tick={{fontSize:11}} label={{value:"← Menor impacto    IMPACTO POTENCIAL    Mayor impacto →",position:"bottom",offset:20,style:{fontSize:10,fill:"#64748b"}}}/>
                  <YAxis dataKey="y" name="Dificultad" unit="" tick={{fontSize:11}} label={{value:"DIFICULTAD DE IMPLEMENTACIÓN →",angle:-90,position:"left",offset:20,style:{fontSize:10,fill:"#64748b"}}}/>
                  <ZAxis dataKey="z" range={[100,400]}/>
                  <Tooltip content={({active,payload})=>{
                    if(active&&payload?.length){
                      const d=payload[0].payload;
                      return <div className="bg-white p-2 border rounded shadow text-xs"><strong>{d.name}</strong><br/>Impacto: {d.x}/100 | Dificultad: {d.y}/100</div>
                    }
                    return null;
                  }}/>
                  <Scatter data={impactMatrix} fill="#2563eb"/>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mb-4">Cuadrante inferior-derecho = Quick wins (alto impacto, baja dificultad). Superior-izquierdo = proyectos de largo plazo.</p>
          </SubSection>

          <SubSection title="9.2 Plan de acción priorizado para ZTE en Colombia">
            <Table headers={["Prioridad","Iniciativa","Impacto","Dificultad","Horizonte","Detalle de implementación"]}
              rows={[
                ["🥇 1","Alianzas estratégicas con operadores (Claro, Tigo, Movistar)","90/100","30/100","0-6 meses","Apalancar relación existente de infraestructura 5G para negociar inclusión de smartphones ZTE/nubia en catálogos de operadores con financiamiento. Comenzar con 3-5 modelos Blade (entry) y nubia Focus (mid). Subsidio cruzado desde contratos de red."],
                ["🥈 2","Posventa localizada","70/100","25/100","0-6 meses","Certificar 10-15 talleres autorizados en Bogotá, Medellín, Cali y Barranquilla. Garantía local de 1 año + soporte en español. Diferenciador clave vs Transsion/Honor que carecen de red local."],
                ["🥉 3","Entrada por nicho gaming (RedMagic)","75/100","40/100","3-9 meses","Lanzar RedMagic en Colombia vía MercadoLibre + partnerships con comunidades gaming (e-sports). Colombia tiene 22M+ gamers. No existe competidor directo en gaming phones. Precio $399-599."],
                ["4","Serie mid-range 5G accesible","85/100","50/100","6-12 meses","Lanzar nubia Neo 3 5G (€249-299) y ZTE Blade V50 5G como los '5G más accesibles de Colombia'. Timing coincide con expansión de cobertura 5G. Meta: capturar 2-3% de envíos en 12 meses."],
                ["5","IA on-device como diferenciador","60/100","60/100","6-18 meses","Posicionar 'AI for All' como claim: IA generativa en dispositivos de $200-400 cuando Samsung/Apple la reservan para >$600. Demo en puntos de venta con traducción en tiempo real, edición foto IA."],
                ["6","Foldable accesible (nubia Flip)","50/100","70/100","12-18 meses","Introducir nubia Flip 2 como el plegable más barato del mercado colombiano (~$500-600 vs Galaxy Z Flip ~$1,000). Canal: operadores + e-commerce. Mercado nicho pero alto valor de marca."],
                ["7","Construcción de marca premium","40/100","80/100","18-36 meses","Campaña de brand-building enfocada en 'Be Yourself' (nubia) y 'Better for All' (ZTE). Influencers locales, sponsorship de gaming, presencia en ferias tech colombianas. Objetivo: awareness >15% en 3 años."],
              ]}
            />
          </SubSection>

          <Callout type="success">
            <strong>Síntesis:</strong> El camino más eficiente para ZTE en Colombia es una estrategia de "land and expand" — entrar vía operadores (canal donde ya tiene relaciones) con dispositivos accesibles, construir credibilidad con posventa local, y luego expandir hacia nichos de alto valor (gaming, plegables, IA). El objetivo realista a 3 años es capturar 3-5% de cuota de envíos en Colombia, equivalente a ~$100-180M en revenue anual.
          </Callout>
        </Section>

        {/* FUENTES */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-600 mb-3">Fuentes y metodología</h3>
          <div className="text-xs text-slate-500 space-y-1">
            <p>• <strong>IDC</strong> — Worldwide Quarterly Mobile Phone Tracker (Q4 2024, Q1-Q3 2025)</p>
            <p>• <strong>Counterpoint Research</strong> — Market Monitor: Colombia Q1 2024; Global Smartphone Forecast 2024; 5G Colombia Q3 2024</p>
            <p>• <strong>StatCounter Global Stats</strong> — Mobile Vendor Market Share Colombia, Enero 2026</p>
            <p>• <strong>Grand View Research</strong> — Smartphone Market Size & Share Report 2025-2030</p>
            <p>• <strong>Statista</strong> — Smartphones Colombia Market Forecast 2024-2029; Chinese Brand Share Colombia</p>
            <p>• <strong>Market Data Forecast</strong> — Latin America Smartphone Market 2024-2034</p>
            <p>• <strong>ZTE Corporation</strong> — Informes financieros: FY2024, H1 2025, Q1 2025, 9M 2025 (zte.com.cn/global)</p>
            <p>• <strong>Canalys / TechInsights</strong> — Global Smartphone Vendor & OS Market Share Q1-Q3 2025</p>
            <p>• <strong>Accio Business</strong> — Global Smartphone Market Share Trends 2025</p>
            <p>• <strong>Nota:</strong> Los datos de cuota de mercado por envíos (Counterpoint) y por uso web (StatCounter) miden cosas diferentes y pueden divergir significativamente. El análisis triangula ambas fuentes. Las estimaciones de TAM/SAM/SOM para ZTE Colombia son proyecciones propias basadas en benchmarks de marcas entrantes similares (Transsion, Honor).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
