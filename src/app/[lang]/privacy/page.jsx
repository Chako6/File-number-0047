'use client'

import Link from 'next/link'
import { useLanguage } from '../../../context/LanguageContext'

const content = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Cookie Policy & Data Protection',
    effectiveDate: 'Effective Date: 1 April 2026',
    sections: [
      {
        heading: '1. Data Controller',
        body: 'Boğaziçi Racing is a Formula Student project team of Boğaziçi University. For purposes of Turkish data protection law (Law No. 6698 — KVKK), Boğaziçi Racing acts as the data controller for personal data collected through this website.\n\nContact: info.buracing@gmail.com',
      },
      {
        heading: '2. Data We Collect',
        body: 'We collect personal data only when you voluntarily submit our contact form. The data collected is:\n\n• Full name\n• Email address\n• Message content\n• Enquiry type (General or Sponsorship)\n\nWe do not collect any data automatically other than analytics data described below, and only with your explicit consent.',
      },
      {
        heading: '3. Purpose and Legal Basis of Processing',
        body: 'Your contact form data is processed solely for the purpose of responding to your enquiry. The legal basis is legitimate interest under Article 5(1)(f) of the KVKK (Law No. 6698): processing is necessary for the legitimate interests pursued by the data controller, provided those interests are not overridden by the interests of the data subject.',
      },
      {
        heading: '4. Third-Party Data Processors',
        body: 'Your contact form submission is transmitted via Resend (resend.com), an email delivery service based in the United States. Resend processes your data solely to deliver the message and does not retain it beyond message delivery. No other third parties receive your personal data from our contact form.\n\nIf you consent to analytics cookies, your usage data is processed by Google LLC via Google Analytics. Google may transfer data to the United States. For details, see Google\'s Privacy Policy.',
      },
      {
        heading: '5. Cookies',
        body: 'We use the following cookie categories:\n\n• Essential cookies: Necessary for the website to function correctly. These cannot be disabled.\n\n• Analytics cookies (Google Analytics, GA4): Used to understand how visitors interact with the site — pages visited, session duration, and similar aggregated data. These cookies are only set after you give explicit consent via our cookie banner.\n\n• Marketing cookies: We do not currently use marketing or advertising cookies.\n\nYour cookie preferences are stored in a cookie named buracing_consent for 12 months. You can change your preferences at any time by clearing this cookie.',
      },
      {
        heading: '6. Data Retention',
        body: 'Emails received via the contact form are retained for as long as necessary to process your enquiry, and no longer than 1 year. Cookie preference data is retained for 12 months.',
      },
      {
        heading: '7. Data Security',
        body: 'We take reasonable technical and organisational measures to protect your personal data. Our website is served over HTTPS. Contact form submissions are transmitted via Resend\'s encrypted API.',
      },
      {
        heading: '8. Your Rights under KVKK Article 11',
        body: 'Under Article 11 of the Turkish Personal Data Protection Law (Law No. 6698), you have the right to:\n\n• Learn whether your personal data is being processed\n• Request information about the processing\n• Learn the purpose of processing and whether data is used in accordance with that purpose\n• Know the third parties to whom your data has been transferred\n• Request rectification of incomplete or inaccurate data\n• Request deletion or destruction of your data within the framework of the conditions set out in Article 7\n• Request that third parties to whom your data has been transferred are notified of rectification or deletion\n• Object to any result that arises to your detriment through automated analysis of your data\n• Request compensation for damages caused by unlawful processing of your data\n\nTo exercise any of these rights, please contact us at: info.buracing@gmail.com',
      },
      {
        heading: '9. Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
      },
    ],
  },

  tr: {
    title: 'KVKK Aydınlatma Metni',
    subtitle: 'Gizlilik Politikası & Çerez Politikası',
    effectiveDate: 'Yürürlük Tarihi: 1 Nisan 2026',
    sections: [
      {
        heading: '1. Veri Sorumlusu',
        body: 'Boğaziçi Racing, Boğaziçi Üniversitesi bünyesinde faaliyet gösteren bir Formula Student proje takımıdır. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, bu web sitesi aracılığıyla toplanan kişisel veriler bakımından veri sorumlusu Boğaziçi Racing\'dir.\n\nİletişim: info.buracing@gmail.com',
      },
      {
        heading: '2. Toplanan Kişisel Veriler',
        body: 'Kişisel verilerinizi yalnızca iletişim formunu gönüllü olarak doldurduğunuzda topluyoruz. Toplanan veriler şunlardır:\n\n• Ad Soyad\n• E-posta adresi\n• Mesaj içeriği\n• Konu türü (Genel veya Sponsorluk)\n\nAşağıda açıklanan analitik veriler dışında, verilerinizi yalnızca açık onayınızla ve otomatik olarak toplamıyoruz.',
      },
      {
        heading: '3. Kişisel Verilerin İşlenme Amacı ve Hukuki Dayanağı',
        body: 'İletişim formu verileriniz yalnızca talebinize yanıt vermek amacıyla işlenmektedir. Hukuki dayanak, KVKK Madde 5/1(f) kapsamındaki meşru menfaattir: veri sorumlusunun meşru menfaatlerinin korunması için zorunlu olan hallerde, ilgili kişinin temel hak ve özgürlükleri zarara uğratılmamak kaydıyla kişisel veri işlenebilir.',
      },
      {
        heading: '4. Üçüncü Taraf Veri İşleyicileri',
        body: 'İletişim formu aracılığıyla gönderilen verileriniz, ABD merkezli bir e-posta dağıtım hizmeti olan Resend (resend.com) üzerinden iletilmektedir. Resend, verilerinizi yalnızca mesajı iletmek amacıyla işler ve mesaj iletimi sonrasında saklamaz. İletişim formunuzdan elde edilen kişisel veriler başka hiçbir üçüncü tarafla paylaşılmaz.\n\nAnalitik çerezlere onay vermeniz durumunda, kullanım verileriniz Google Analytics aracılığıyla Google LLC tarafından işlenir. Google, verileri ABD\'ye aktarabilir. Ayrıntılar için Google\'ın Gizlilik Politikası\'na bakınız.',
      },
      {
        heading: '5. Çerezler (Cookie Politikası)',
        body: 'Aşağıdaki çerez kategorilerini kullanmaktayız:\n\n• Zorunlu çerezler: Web sitesinin doğru çalışması için gereklidir. Devre dışı bırakılamazlar.\n\n• Analitik çerezler (Google Analytics, GA4): Ziyaretçilerin siteyle nasıl etkileşime geçtiğini anlamak amacıyla kullanılır — ziyaret edilen sayfalar, oturum süresi ve benzeri toplu veriler. Bu çerezler yalnızca çerez banner\'ından açık onay vermeniz halinde yerleştirilir.\n\n• Pazarlama çerezleri: Şu an herhangi bir pazarlama veya reklam çerezi kullanmıyoruz.\n\nÇerez tercihleriniz, buracing_consent adlı bir çerezde 12 ay süreyle saklanır. Bu çerezi silerek tercihlerinizi istediğiniz zaman değiştirebilirsiniz.',
      },
      {
        heading: '6. Veri Saklama Süresi',
        body: 'İletişim formu aracılığıyla alınan e-postalar, talebinizin işlenmesi için gerekli olan süre boyunca ve en fazla 1 yıl saklanır. Çerez tercih verileri 12 ay süreyle tutulur.',
      },
      {
        heading: '7. Veri Güvenliği',
        body: 'Kişisel verilerinizi korumak için makul teknik ve organizasyonel önlemler almaktayız. Web sitemiz HTTPS üzerinden sunulmaktadır. İletişim formu verileri, Resend\'in şifreli API\'si aracılığıyla iletilmektedir.',
      },
      {
        heading: '8. KVKK Madde 11 Kapsamındaki Haklarınız',
        body: '6698 sayılı Kişisel Verilerin Korunması Kanunu\'nun 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme\n• Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme\n• Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme\n• Kanun\'un 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme\n• Düzeltme veya silme işleminin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme\n• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme\n• Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme\n\nBu haklarınızı kullanmak için: info.buracing@gmail.com adresine yazabilirsiniz.',
      },
      {
        heading: '9. Politika Değişiklikleri',
        body: 'Bu Aydınlatma Metni zaman zaman güncellenebilir. Değişiklikler, güncellenmiş yürürlük tarihi ile birlikte bu sayfada yayımlanacaktır.',
      },
    ],
  },
}

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const p = content[lang] || content.en

  return (
    <div className="pt-16">
      {/* Banner */}
      <div className="bg-navy py-24 md:py-32 px-6 text-center">
        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">{p.subtitle}</p>
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">{p.title}</h1>
        <div className="w-10 h-px bg-gold mx-auto mb-5" />
        <p className="text-white/40 text-xs tracking-wider">{p.effectiveDate}</p>
      </div>

      {/* Content */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {p.sections.map((section) => (
            <div key={section.heading} className="mb-12">
              <h2 className="text-navy text-base font-bold tracking-wider mb-4">{section.heading}</h2>
              <div className="w-8 h-px bg-gold mb-5" />
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.body}</div>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-10 mt-4">
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-6 py-2.5 border border-navy text-navy text-xs font-bold tracking-widest uppercase hover:bg-navy hover:text-white transition-all duration-300"
            >
              {lang === 'en' ? 'Contact Us' : 'Bize Ulaşın'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
