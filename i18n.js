// ============================================
// GlobalTime Sync — Internationalization (i18n)
// ============================================

(function () {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'hi', 'ar', 'ru', 'tr'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'gts_lang';

  // --- Translations ---
  const T = {
    en: {
      // Header
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.howto': 'How to Use',
      'nav.timezones': 'Time Zones',
      'tagline': 'Compare time zones instantly. Schedule meetings effortlessly.',
      // Hero
      'hero.title': 'Find the Perfect Meeting Time Across Time Zones',
      'hero.desc': 'Add cities where your team is located, see live clocks side by side, and discover the best overlapping hours for your next meeting — all for free.',
      'hero.share': 'Share with your team:',
      // Dashboard
      'dashboard.title': 'Time Zone Dashboard',
      'dashboard.search': 'Search for a city or timezone...',
      'dashboard.addCity': '+ Add City',
      'dashboard.maxCities': 'Maximum of 10 cities allowed.',
      'dashboard.duplicate': 'This city is already added.',
      // Meeting Finder
      'meeting.title': 'Meeting Overlap Finder',
      'meeting.hint': 'Add at least 2 cities, then find the best meeting time.',
      'meeting.findBtn': 'Find Best Meeting Time',
      'meeting.noOverlap': 'No overlapping working hours found across all selected cities. Try adjusting working hours or reducing the number of cities.',
      'meeting.perfect': 'Perfect overlap',
      'meeting.limited': 'Limited window',
      'meeting.tight': 'Tight window',
      'meeting.copy': 'Copy to clipboard',
      'meeting.copied': 'Copied!',
      'meeting.share': 'Share',
      'meeting.workHours': 'Work hours:',
      'meeting.to': 'to',
      // FAQ
      'faq.title': 'Frequently Asked Questions',
      'faq.q1': 'How does GlobalTime Sync work?',
      'faq.a1': 'GlobalTime Sync uses your browser\'s built-in Intl API to display accurate time zone data for any city in the world. Simply search and add cities to see their current times side by side on an interactive 24-hour timeline.',
      'faq.q2': 'Is GlobalTime Sync free to use?',
      'faq.a2': 'Yes, GlobalTime Sync is completely free. There are no sign-ups, subscriptions, or hidden fees. All features are available to everyone.',
      'faq.q3': 'How do I find the best meeting time across time zones?',
      'faq.a3': 'Add all the cities where your team members are located, adjust working hours if needed, then click "Find Best Meeting Time". The tool will calculate overlapping working hours and suggest the best windows.',
      'faq.q4': 'How many cities can I compare at once?',
      'faq.a4': 'You can compare up to 10 cities simultaneously. Each city shows a live clock with hours, minutes, seconds, date, and UTC offset, plus a visual 24-hour timeline bar.',
      'faq.q5': 'Does GlobalTime Sync account for Daylight Saving Time?',
      'faq.a5': 'Yes. GlobalTime Sync uses the IANA time zone database through your browser\'s Intl API, which automatically handles Daylight Saving Time transitions for all supported time zones.',
      'faq.q6': 'Can I share my meeting time results?',
      'faq.a6': 'Yes! After finding the best meeting time, you can use the copy-to-clipboard button to copy the results and share them with your team via email, chat, or any messaging app.',
      // Footer
      'footer.about': 'About Us',
      'footer.howto': 'How to Use & FAQ',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      'footer.copyright': '© 2026 GlobalTime Sync. All rights reserved.',
      'footer.feedback': 'Suggestions? Let us know',
      // Feedback Panel
      'feedback.title': 'Send Feedback',
      'feedback.type': 'Type',
      'feedback.type.feature': 'Feature Request',
      'feedback.type.bug': 'Bug Report',
      'feedback.type.improve': 'Improvement',
      'feedback.type.other': 'Other',
      'feedback.message': 'Your message',
      'feedback.messagePlaceholder': 'Tell us what you think...',
      'feedback.email': 'Your email (optional)',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': 'Send Feedback',
      'feedback.thanks': 'Thank you for your feedback!',
      // Language names (shown in selector)
      'lang.en': 'English',
      'lang.ko': '한국어',
      'lang.ja': '日本語',
      'lang.zh': '中文',
      'lang.es': 'Español',
      'lang.fr': 'Français',
      'lang.de': 'Deutsch',
      'lang.pt': 'Português',
      'lang.hi': 'हिन्दी',
      'lang.ar': 'العربية',
      'lang.ru': 'Русский',
      'lang.tr': 'Türkçe'
    },

    ko: {
      'nav.home': '홈',
      'nav.about': '소개',
      'nav.howto': '사용법',
      'nav.timezones': '시간대',
      'tagline': '시간대를 즉시 비교하세요. 손쉽게 회의를 예약하세요.',
      'hero.title': '시간대를 넘어 완벽한 회의 시간을 찾으세요',
      'hero.desc': '팀원이 있는 도시를 추가하고, 실시간 시계를 나란히 보며, 다음 회의를 위한 최적의 겹치는 시간을 찾으세요 — 모두 무료입니다.',
      'hero.share': '팀과 공유하기:',
      'dashboard.title': '시간대 대시보드',
      'dashboard.search': '도시 또는 시간대를 검색하세요...',
      'dashboard.addCity': '+ 도시 추가',
      'dashboard.maxCities': '최대 10개 도시만 추가할 수 있습니다.',
      'dashboard.duplicate': '이미 추가된 도시입니다.',
      'meeting.title': '회의 시간 겹침 찾기',
      'meeting.hint': '2개 이상의 도시를 추가한 후 최적의 회의 시간을 찾으세요.',
      'meeting.findBtn': '최적의 회의 시간 찾기',
      'meeting.noOverlap': '선택한 모든 도시에서 겹치는 근무 시간이 없습니다. 근무 시간을 조정하거나 도시 수를 줄여보세요.',
      'meeting.perfect': '완벽한 겹침',
      'meeting.limited': '제한된 시간대',
      'meeting.tight': '빠듯한 시간대',
      'meeting.copy': '클립보드에 복사',
      'meeting.copied': '복사됨!',
      'meeting.share': '공유',
      'meeting.workHours': '근무 시간:',
      'meeting.to': '~',
      'faq.title': '자주 묻는 질문',
      'faq.q1': 'GlobalTime Sync는 어떻게 작동하나요?',
      'faq.a1': 'GlobalTime Sync는 브라우저의 내장 Intl API를 사용하여 전 세계 모든 도시의 정확한 시간대 데이터를 표시합니다. 도시를 검색하고 추가하면 대화형 24시간 타임라인에서 현재 시간을 나란히 볼 수 있습니다.',
      'faq.q2': 'GlobalTime Sync는 무료인가요?',
      'faq.a2': '네, GlobalTime Sync는 완전히 무료입니다. 가입, 구독, 숨겨진 비용이 없습니다. 모든 기능을 누구나 사용할 수 있습니다.',
      'faq.q3': '시간대를 넘어 최적의 회의 시간을 어떻게 찾나요?',
      'faq.a3': '팀원이 있는 모든 도시를 추가하고, 필요하면 근무 시간을 조정한 후 "최적의 회의 시간 찾기"를 클릭하세요. 겹치는 근무 시간을 계산하여 최적의 시간대를 제안합니다.',
      'faq.q4': '한 번에 몇 개의 도시를 비교할 수 있나요?',
      'faq.a4': '최대 10개 도시를 동시에 비교할 수 있습니다. 각 도시는 시, 분, 초, 날짜, UTC 오프셋이 포함된 실시간 시계와 24시간 타임라인 바를 표시합니다.',
      'faq.q5': 'GlobalTime Sync는 서머타임을 반영하나요?',
      'faq.a5': '네. GlobalTime Sync는 브라우저의 Intl API를 통해 IANA 시간대 데이터베이스를 사용하며, 모든 지원 시간대의 서머타임 전환을 자동으로 처리합니다.',
      'faq.q6': '회의 시간 결과를 공유할 수 있나요?',
      'faq.a6': '네! 최적의 회의 시간을 찾은 후 클립보드에 복사 버튼을 사용하여 결과를 복사하고 이메일, 채팅 또는 메시징 앱을 통해 팀과 공유할 수 있습니다.',
      'footer.about': '소개',
      'footer.howto': '사용법 & FAQ',
      'footer.privacy': '개인정보처리방침',
      'footer.terms': '이용약관',
      'footer.copyright': '© 2026 GlobalTime Sync. 모든 권리 보유.',
      'footer.feedback': '제안이 있으신가요? 알려주세요',
      'feedback.title': '피드백 보내기',
      'feedback.type': '유형',
      'feedback.type.feature': '기능 요청',
      'feedback.type.bug': '버그 신고',
      'feedback.type.improve': '개선 사항',
      'feedback.type.other': '기타',
      'feedback.message': '메시지',
      'feedback.messagePlaceholder': '의견을 알려주세요...',
      'feedback.email': '이메일 (선택사항)',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': '피드백 보내기',
      'feedback.thanks': '피드백을 보내주셔서 감사합니다!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    ja: {
      'nav.home': 'ホーム',
      'nav.about': '概要',
      'nav.howto': '使い方',
      'nav.timezones': 'タイムゾーン',
      'tagline': 'タイムゾーンを即座に比較。会議を簡単にスケジュール。',
      'hero.title': 'タイムゾーンを超えて最適な会議時間を見つけましょう',
      'hero.desc': 'チームのいる都市を追加し、リアルタイムの時計を並べて表示し、次の会議に最適な重なり時間を見つけましょう — すべて無料です。',
      'hero.share': 'チームと共有:',
      'dashboard.title': 'タイムゾーン ダッシュボード',
      'dashboard.search': '都市またはタイムゾーンを検索...',
      'dashboard.addCity': '+ 都市を追加',
      'dashboard.maxCities': '最大10都市まで追加できます。',
      'dashboard.duplicate': 'この都市は既に追加されています。',
      'meeting.title': '会議時間の重なり検索',
      'meeting.hint': '2つ以上の都市を追加して、最適な会議時間を見つけましょう。',
      'meeting.findBtn': '最適な会議時間を見つける',
      'meeting.noOverlap': '選択したすべての都市で重なる勤務時間が見つかりませんでした。勤務時間を調整するか、都市の数を減らしてみてください。',
      'meeting.perfect': '完全な重なり',
      'meeting.limited': '限られた時間帯',
      'meeting.tight': 'タイトな時間帯',
      'meeting.copy': 'クリップボードにコピー',
      'meeting.copied': 'コピーしました！',
      'meeting.share': '共有',
      'meeting.workHours': '勤務時間:',
      'meeting.to': '〜',
      'faq.title': 'よくある質問',
      'faq.q1': 'GlobalTime Syncはどのように機能しますか？',
      'faq.a1': 'GlobalTime Syncはブラウザ内蔵のIntl APIを使用して、世界中のすべての都市の正確なタイムゾーンデータを表示します。都市を検索して追加するだけで、インタラクティブな24時間タイムラインで現在の時刻を並べて確認できます。',
      'faq.q2': 'GlobalTime Syncは無料ですか？',
      'faq.a2': 'はい、GlobalTime Syncは完全に無料です。サインアップ、サブスクリプション、隠れた費用は一切ありません。すべての機能をどなたでもご利用いただけます。',
      'faq.q3': 'タイムゾーンを超えて最適な会議時間をどのように見つけますか？',
      'faq.a3': 'チームメンバーのいるすべての都市を追加し、必要に応じて勤務時間を調整してから「最適な会議時間を見つける」をクリックしてください。重なる勤務時間を計算し、最適な時間帯を提案します。',
      'faq.q4': '一度に何都市まで比較できますか？',
      'faq.a4': '最大10都市を同時に比較できます。各都市には時・分・秒・日付・UTCオフセット付きのライブ時計と24時間タイムラインバーが表示されます。',
      'faq.q5': 'GlobalTime Syncは夏時間に対応していますか？',
      'faq.a5': 'はい。GlobalTime SyncはブラウザのIntl APIを通じてIANAタイムゾーンデータベースを使用し、すべてのサポートされるタイムゾーンの夏時間の切り替えを自動的に処理します。',
      'faq.q6': '会議時間の結果を共有できますか？',
      'faq.a6': 'はい！最適な会議時間を見つけた後、クリップボードにコピーボタンを使って結果をコピーし、メール、チャット、またはメッセージングアプリでチームと共有できます。',
      'footer.about': '概要',
      'footer.howto': '使い方 & FAQ',
      'footer.privacy': 'プライバシーポリシー',
      'footer.terms': '利用規約',
      'footer.copyright': '© 2026 GlobalTime Sync. All rights reserved.',
      'footer.feedback': 'ご提案はありますか？お知らせください',
      'feedback.title': 'フィードバックを送信',
      'feedback.type': '種類',
      'feedback.type.feature': '機能リクエスト',
      'feedback.type.bug': 'バグ報告',
      'feedback.type.improve': '改善提案',
      'feedback.type.other': 'その他',
      'feedback.message': 'メッセージ',
      'feedback.messagePlaceholder': 'ご意見をお聞かせください...',
      'feedback.email': 'メールアドレス（任意）',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': 'フィードバックを送信',
      'feedback.thanks': 'フィードバックありがとうございます！',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    zh: {
      'nav.home': '首页',
      'nav.about': '关于',
      'nav.howto': '使用方法',
      'nav.timezones': '时区',
      'tagline': '即时比较时区。轻松安排会议。',
      'hero.title': '跨时区找到完美的会议时间',
      'hero.desc': '添加团队所在的城市，并排查看实时时钟，发现下次会议的最佳重叠时间 — 完全免费。',
      'hero.share': '与团队分享：',
      'dashboard.title': '时区仪表板',
      'dashboard.search': '搜索城市或时区...',
      'dashboard.addCity': '+ 添加城市',
      'dashboard.maxCities': '最多可添加10个城市。',
      'dashboard.duplicate': '该城市已添加。',
      'meeting.title': '会议时间重叠查找',
      'meeting.hint': '添加至少2个城市，然后查找最佳会议时间。',
      'meeting.findBtn': '查找最佳会议时间',
      'meeting.noOverlap': '在所有选定城市中未找到重叠的工作时间。请尝试调整工作时间或减少城市数量。',
      'meeting.perfect': '完美重叠',
      'meeting.limited': '有限时间窗',
      'meeting.tight': '紧凑时间窗',
      'meeting.copy': '复制到剪贴板',
      'meeting.copied': '已复制！',
      'meeting.share': '分享',
      'meeting.workHours': '工作时间：',
      'meeting.to': '至',
      'faq.title': '常见问题',
      'faq.q1': 'GlobalTime Sync 如何工作？',
      'faq.a1': 'GlobalTime Sync 使用浏览器内置的 Intl API 显示世界上任何城市的精确时区数据。只需搜索并添加城市，即可在交互式24小时时间线上并排查看当前时间。',
      'faq.q2': 'GlobalTime Sync 是免费的吗？',
      'faq.a2': '是的，GlobalTime Sync 完全免费。无需注册，无订阅，无隐藏费用。所有功能对所有人开放。',
      'faq.q3': '如何跨时区找到最佳会议时间？',
      'faq.a3': '添加团队成员所在的所有城市，根据需要调整工作时间，然后点击"查找最佳会议时间"。工具将计算重叠的工作时间并建议最佳时间窗。',
      'faq.q4': '一次可以比较多少个城市？',
      'faq.a4': '最多可同时比较10个城市。每个城市显示包含时、分、秒、日期和UTC偏移的实时时钟，以及24小时时间线条。',
      'faq.q5': 'GlobalTime Sync 考虑夏令时吗？',
      'faq.a5': '是的。GlobalTime Sync 通过浏览器的 Intl API 使用 IANA 时区数据库，自动处理所有支持时区的夏令时转换。',
      'faq.q6': '可以分享会议时间结果吗？',
      'faq.a6': '可以！找到最佳会议时间后，您可以使用复制到剪贴板按钮复制结果，并通过电子邮件、聊天或任何消息应用与团队分享。',
      'footer.about': '关于我们',
      'footer.howto': '使用方法 & FAQ',
      'footer.privacy': '隐私政策',
      'footer.terms': '服务条款',
      'footer.copyright': '© 2026 GlobalTime Sync. 保留所有权利。',
      'footer.feedback': '有建议？告诉我们',
      'feedback.title': '发送反馈',
      'feedback.type': '类型',
      'feedback.type.feature': '功能请求',
      'feedback.type.bug': '错误报告',
      'feedback.type.improve': '改进建议',
      'feedback.type.other': '其他',
      'feedback.message': '您的消息',
      'feedback.messagePlaceholder': '告诉我们您的想法...',
      'feedback.email': '您的邮箱（可选）',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': '发送反馈',
      'feedback.thanks': '感谢您的反馈！',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    es: {
      'nav.home': 'Inicio',
      'nav.about': 'Acerca de',
      'nav.howto': 'Cómo usar',
      'nav.timezones': 'Zonas horarias',
      'tagline': 'Compara zonas horarias al instante. Programa reuniones sin esfuerzo.',
      'hero.title': 'Encuentra el horario perfecto para reuniones entre zonas horarias',
      'hero.desc': 'Agrega las ciudades donde está tu equipo, ve relojes en vivo uno al lado del otro y descubre las mejores horas superpuestas para tu próxima reunión — todo gratis.',
      'hero.share': 'Comparte con tu equipo:',
      'dashboard.title': 'Panel de Zonas Horarias',
      'dashboard.search': 'Buscar una ciudad o zona horaria...',
      'dashboard.addCity': '+ Agregar ciudad',
      'dashboard.maxCities': 'Máximo de 10 ciudades permitidas.',
      'dashboard.duplicate': 'Esta ciudad ya está agregada.',
      'meeting.title': 'Buscador de horarios superpuestos',
      'meeting.hint': 'Agrega al menos 2 ciudades, luego encuentra el mejor horario de reunión.',
      'meeting.findBtn': 'Encontrar mejor horario',
      'meeting.noOverlap': 'No se encontraron horas de trabajo superpuestas en todas las ciudades seleccionadas. Intenta ajustar las horas de trabajo o reducir el número de ciudades.',
      'meeting.perfect': 'Superposición perfecta',
      'meeting.limited': 'Ventana limitada',
      'meeting.tight': 'Ventana ajustada',
      'meeting.copy': 'Copiar al portapapeles',
      'meeting.copied': '¡Copiado!',
      'meeting.share': 'Compartir',
      'meeting.workHours': 'Horario laboral:',
      'meeting.to': 'a',
      'faq.title': 'Preguntas Frecuentes',
      'faq.q1': '¿Cómo funciona GlobalTime Sync?',
      'faq.a1': 'GlobalTime Sync utiliza la API Intl integrada del navegador para mostrar datos precisos de zonas horarias de cualquier ciudad del mundo. Simplemente busca y agrega ciudades para ver sus horarios actuales uno al lado del otro en una línea de tiempo interactiva de 24 horas.',
      'faq.q2': '¿Es gratuito GlobalTime Sync?',
      'faq.a2': 'Sí, GlobalTime Sync es completamente gratuito. No hay registros, suscripciones ni tarifas ocultas. Todas las funciones están disponibles para todos.',
      'faq.q3': '¿Cómo encuentro el mejor horario de reunión entre zonas horarias?',
      'faq.a3': 'Agrega todas las ciudades donde están los miembros de tu equipo, ajusta las horas de trabajo si es necesario, luego haz clic en "Encontrar mejor horario". La herramienta calculará las horas de trabajo superpuestas y sugerirá las mejores ventanas.',
      'faq.q4': '¿Cuántas ciudades puedo comparar a la vez?',
      'faq.a4': 'Puedes comparar hasta 10 ciudades simultáneamente. Cada ciudad muestra un reloj en vivo con horas, minutos, segundos, fecha y offset UTC, además de una barra de línea de tiempo visual de 24 horas.',
      'faq.q5': '¿GlobalTime Sync tiene en cuenta el horario de verano?',
      'faq.a5': 'Sí. GlobalTime Sync utiliza la base de datos de zonas horarias IANA a través de la API Intl del navegador, que maneja automáticamente las transiciones de horario de verano para todas las zonas horarias compatibles.',
      'faq.q6': '¿Puedo compartir los resultados del horario de reunión?',
      'faq.a6': '¡Sí! Después de encontrar el mejor horario de reunión, puedes usar el botón de copiar al portapapeles para copiar los resultados y compartirlos con tu equipo por correo electrónico, chat o cualquier aplicación de mensajería.',
      'footer.about': 'Sobre nosotros',
      'footer.howto': 'Cómo usar & FAQ',
      'footer.privacy': 'Política de privacidad',
      'footer.terms': 'Términos de servicio',
      'footer.copyright': '© 2026 GlobalTime Sync. Todos los derechos reservados.',
      'footer.feedback': '¿Sugerencias? Cuéntanos',
      'feedback.title': 'Enviar comentarios',
      'feedback.type': 'Tipo',
      'feedback.type.feature': 'Solicitud de función',
      'feedback.type.bug': 'Informe de error',
      'feedback.type.improve': 'Mejora',
      'feedback.type.other': 'Otro',
      'feedback.message': 'Tu mensaje',
      'feedback.messagePlaceholder': 'Cuéntanos qué piensas...',
      'feedback.email': 'Tu correo electrónico (opcional)',
      'feedback.emailPlaceholder': 'tu@email.com',
      'feedback.send': 'Enviar comentarios',
      'feedback.thanks': '¡Gracias por tus comentarios!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    fr: {
      'nav.home': 'Accueil',
      'nav.about': 'À propos',
      'nav.howto': 'Comment utiliser',
      'nav.timezones': 'Fuseaux horaires',
      'tagline': 'Comparez les fuseaux horaires instantanément. Planifiez des réunions facilement.',
      'hero.title': 'Trouvez l\'heure de réunion parfaite entre les fuseaux horaires',
      'hero.desc': 'Ajoutez les villes où se trouve votre équipe, voyez les horloges en direct côte à côte et découvrez les meilleurs créneaux pour votre prochaine réunion — le tout gratuitement.',
      'hero.share': 'Partagez avec votre équipe :',
      'dashboard.title': 'Tableau de bord des fuseaux horaires',
      'dashboard.search': 'Rechercher une ville ou un fuseau horaire...',
      'dashboard.addCity': '+ Ajouter une ville',
      'dashboard.maxCities': 'Maximum de 10 villes autorisées.',
      'dashboard.duplicate': 'Cette ville est déjà ajoutée.',
      'meeting.title': 'Recherche de créneaux communs',
      'meeting.hint': 'Ajoutez au moins 2 villes, puis trouvez le meilleur créneau de réunion.',
      'meeting.findBtn': 'Trouver le meilleur créneau',
      'meeting.noOverlap': 'Aucune heure de travail commune trouvée pour toutes les villes sélectionnées. Essayez d\'ajuster les horaires de travail ou de réduire le nombre de villes.',
      'meeting.perfect': 'Chevauchement parfait',
      'meeting.limited': 'Créneau limité',
      'meeting.tight': 'Créneau serré',
      'meeting.copy': 'Copier dans le presse-papiers',
      'meeting.copied': 'Copié !',
      'meeting.share': 'Partager',
      'meeting.workHours': 'Heures de travail :',
      'meeting.to': 'à',
      'faq.title': 'Questions Fréquentes',
      'faq.q1': 'Comment fonctionne GlobalTime Sync ?',
      'faq.a1': 'GlobalTime Sync utilise l\'API Intl intégrée de votre navigateur pour afficher des données de fuseau horaire précises pour n\'importe quelle ville du monde. Recherchez et ajoutez simplement des villes pour voir leurs heures actuelles côte à côte sur une chronologie interactive de 24 heures.',
      'faq.q2': 'GlobalTime Sync est-il gratuit ?',
      'faq.a2': 'Oui, GlobalTime Sync est entièrement gratuit. Pas d\'inscription, pas d\'abonnement, pas de frais cachés. Toutes les fonctionnalités sont accessibles à tous.',
      'faq.q3': 'Comment trouver le meilleur créneau de réunion entre fuseaux horaires ?',
      'faq.a3': 'Ajoutez toutes les villes où se trouvent les membres de votre équipe, ajustez les heures de travail si nécessaire, puis cliquez sur "Trouver le meilleur créneau". L\'outil calculera les heures de travail communes et suggérera les meilleurs créneaux.',
      'faq.q4': 'Combien de villes puis-je comparer en même temps ?',
      'faq.a4': 'Vous pouvez comparer jusqu\'à 10 villes simultanément. Chaque ville affiche une horloge en direct avec heures, minutes, secondes, date et décalage UTC, plus une barre chronologique visuelle de 24 heures.',
      'faq.q5': 'GlobalTime Sync tient-il compte de l\'heure d\'été ?',
      'faq.a5': 'Oui. GlobalTime Sync utilise la base de données des fuseaux horaires IANA via l\'API Intl de votre navigateur, qui gère automatiquement les transitions d\'heure d\'été pour tous les fuseaux horaires pris en charge.',
      'faq.q6': 'Puis-je partager les résultats de l\'heure de réunion ?',
      'faq.a6': 'Oui ! Après avoir trouvé le meilleur créneau de réunion, vous pouvez utiliser le bouton de copie pour copier les résultats et les partager avec votre équipe par e-mail, chat ou toute application de messagerie.',
      'footer.about': 'À propos',
      'footer.howto': 'Utilisation & FAQ',
      'footer.privacy': 'Politique de confidentialité',
      'footer.terms': 'Conditions d\'utilisation',
      'footer.copyright': '© 2026 GlobalTime Sync. Tous droits réservés.',
      'footer.feedback': 'Des suggestions ? Dites-le nous',
      'feedback.title': 'Envoyer un commentaire',
      'feedback.type': 'Type',
      'feedback.type.feature': 'Demande de fonctionnalité',
      'feedback.type.bug': 'Rapport de bug',
      'feedback.type.improve': 'Amélioration',
      'feedback.type.other': 'Autre',
      'feedback.message': 'Votre message',
      'feedback.messagePlaceholder': 'Dites-nous ce que vous pensez...',
      'feedback.email': 'Votre e-mail (optionnel)',
      'feedback.emailPlaceholder': 'votre@email.com',
      'feedback.send': 'Envoyer',
      'feedback.thanks': 'Merci pour votre retour !',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    de: {
      'nav.home': 'Startseite',
      'nav.about': 'Über uns',
      'nav.howto': 'Anleitung',
      'nav.timezones': 'Zeitzonen',
      'tagline': 'Zeitzonen sofort vergleichen. Meetings mühelos planen.',
      'hero.title': 'Finden Sie die perfekte Meetingzeit über Zeitzonen hinweg',
      'hero.desc': 'Fügen Sie Städte hinzu, in denen Ihr Team arbeitet, sehen Sie Live-Uhren nebeneinander und finden Sie die besten überlappenden Stunden für Ihr nächstes Meeting — alles kostenlos.',
      'hero.share': 'Mit Ihrem Team teilen:',
      'dashboard.title': 'Zeitzonen-Dashboard',
      'dashboard.search': 'Stadt oder Zeitzone suchen...',
      'dashboard.addCity': '+ Stadt hinzufügen',
      'dashboard.maxCities': 'Maximal 10 Städte erlaubt.',
      'dashboard.duplicate': 'Diese Stadt wurde bereits hinzugefügt.',
      'meeting.title': 'Meeting-Überlappungsfinder',
      'meeting.hint': 'Fügen Sie mindestens 2 Städte hinzu, um die beste Meetingzeit zu finden.',
      'meeting.findBtn': 'Beste Meetingzeit finden',
      'meeting.noOverlap': 'Keine überlappenden Arbeitszeiten in allen ausgewählten Städten gefunden. Versuchen Sie, die Arbeitszeiten anzupassen oder die Anzahl der Städte zu reduzieren.',
      'meeting.perfect': 'Perfekte Überlappung',
      'meeting.limited': 'Begrenztes Zeitfenster',
      'meeting.tight': 'Enges Zeitfenster',
      'meeting.copy': 'In die Zwischenablage kopieren',
      'meeting.copied': 'Kopiert!',
      'meeting.share': 'Teilen',
      'meeting.workHours': 'Arbeitszeiten:',
      'meeting.to': 'bis',
      'faq.title': 'Häufig gestellte Fragen',
      'faq.q1': 'Wie funktioniert GlobalTime Sync?',
      'faq.a1': 'GlobalTime Sync verwendet die integrierte Intl-API Ihres Browsers, um genaue Zeitzonendaten für jede Stadt der Welt anzuzeigen. Suchen und fügen Sie einfach Städte hinzu, um deren aktuelle Zeiten nebeneinander auf einer interaktiven 24-Stunden-Zeitleiste zu sehen.',
      'faq.q2': 'Ist GlobalTime Sync kostenlos?',
      'faq.a2': 'Ja, GlobalTime Sync ist völlig kostenlos. Keine Anmeldung, kein Abonnement, keine versteckten Gebühren. Alle Funktionen sind für jeden verfügbar.',
      'faq.q3': 'Wie finde ich die beste Meetingzeit über Zeitzonen hinweg?',
      'faq.a3': 'Fügen Sie alle Städte hinzu, in denen sich Ihre Teammitglieder befinden, passen Sie bei Bedarf die Arbeitszeiten an und klicken Sie dann auf "Beste Meetingzeit finden". Das Tool berechnet die überlappenden Arbeitszeiten und schlägt die besten Zeitfenster vor.',
      'faq.q4': 'Wie viele Städte kann ich gleichzeitig vergleichen?',
      'faq.a4': 'Sie können bis zu 10 Städte gleichzeitig vergleichen. Jede Stadt zeigt eine Live-Uhr mit Stunden, Minuten, Sekunden, Datum und UTC-Offset sowie eine visuelle 24-Stunden-Zeitleiste.',
      'faq.q5': 'Berücksichtigt GlobalTime Sync die Sommerzeit?',
      'faq.a5': 'Ja. GlobalTime Sync verwendet die IANA-Zeitzonendatenbank über die Intl-API Ihres Browsers, die automatisch Sommerzeitumstellungen für alle unterstützten Zeitzonen verwaltet.',
      'faq.q6': 'Kann ich die Meetingzeit-Ergebnisse teilen?',
      'faq.a6': 'Ja! Nachdem Sie die beste Meetingzeit gefunden haben, können Sie die Ergebnisse mit der Schaltfläche "In die Zwischenablage kopieren" kopieren und per E-Mail, Chat oder Messaging-App mit Ihrem Team teilen.',
      'footer.about': 'Über uns',
      'footer.howto': 'Anleitung & FAQ',
      'footer.privacy': 'Datenschutzrichtlinie',
      'footer.terms': 'Nutzungsbedingungen',
      'footer.copyright': '© 2026 GlobalTime Sync. Alle Rechte vorbehalten.',
      'footer.feedback': 'Vorschläge? Lassen Sie es uns wissen',
      'feedback.title': 'Feedback senden',
      'feedback.type': 'Typ',
      'feedback.type.feature': 'Funktionsanfrage',
      'feedback.type.bug': 'Fehlerbericht',
      'feedback.type.improve': 'Verbesserung',
      'feedback.type.other': 'Sonstiges',
      'feedback.message': 'Ihre Nachricht',
      'feedback.messagePlaceholder': 'Sagen Sie uns, was Sie denken...',
      'feedback.email': 'Ihre E-Mail (optional)',
      'feedback.emailPlaceholder': 'ihre@email.com',
      'feedback.send': 'Feedback senden',
      'feedback.thanks': 'Vielen Dank für Ihr Feedback!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    pt: {
      'nav.home': 'Início',
      'nav.about': 'Sobre',
      'nav.howto': 'Como usar',
      'nav.timezones': 'Fusos horários',
      'tagline': 'Compare fusos horários instantaneamente. Agende reuniões facilmente.',
      'hero.title': 'Encontre o horário perfeito para reuniões entre fusos horários',
      'hero.desc': 'Adicione cidades onde sua equipe está, veja relógios ao vivo lado a lado e descubra os melhores horários sobrepostos para sua próxima reunião — tudo grátis.',
      'hero.share': 'Compartilhe com sua equipe:',
      'dashboard.title': 'Painel de Fusos Horários',
      'dashboard.search': 'Pesquisar uma cidade ou fuso horário...',
      'dashboard.addCity': '+ Adicionar cidade',
      'dashboard.maxCities': 'Máximo de 10 cidades permitidas.',
      'dashboard.duplicate': 'Esta cidade já foi adicionada.',
      'meeting.title': 'Buscador de horários sobrepostos',
      'meeting.hint': 'Adicione pelo menos 2 cidades para encontrar o melhor horário de reunião.',
      'meeting.findBtn': 'Encontrar melhor horário',
      'meeting.noOverlap': 'Nenhum horário de trabalho sobreposto encontrado em todas as cidades selecionadas. Tente ajustar os horários de trabalho ou reduzir o número de cidades.',
      'meeting.perfect': 'Sobreposição perfeita',
      'meeting.limited': 'Janela limitada',
      'meeting.tight': 'Janela apertada',
      'meeting.copy': 'Copiar para área de transferência',
      'meeting.copied': 'Copiado!',
      'meeting.share': 'Compartilhar',
      'meeting.workHours': 'Horário de trabalho:',
      'meeting.to': 'até',
      'faq.title': 'Perguntas Frequentes',
      'faq.q1': 'Como o GlobalTime Sync funciona?',
      'faq.a1': 'O GlobalTime Sync usa a API Intl integrada do seu navegador para exibir dados precisos de fuso horário para qualquer cidade do mundo. Basta pesquisar e adicionar cidades para ver seus horários atuais lado a lado em uma linha do tempo interativa de 24 horas.',
      'faq.q2': 'O GlobalTime Sync é gratuito?',
      'faq.a2': 'Sim, o GlobalTime Sync é completamente gratuito. Sem cadastros, assinaturas ou taxas ocultas. Todos os recursos estão disponíveis para todos.',
      'faq.q3': 'Como encontro o melhor horário de reunião entre fusos horários?',
      'faq.a3': 'Adicione todas as cidades onde estão os membros da sua equipe, ajuste os horários de trabalho se necessário e clique em "Encontrar melhor horário". A ferramenta calculará os horários de trabalho sobrepostos e sugerirá as melhores janelas.',
      'faq.q4': 'Quantas cidades posso comparar de uma vez?',
      'faq.a4': 'Você pode comparar até 10 cidades simultaneamente. Cada cidade mostra um relógio ao vivo com horas, minutos, segundos, data e offset UTC, além de uma barra de linha do tempo visual de 24 horas.',
      'faq.q5': 'O GlobalTime Sync considera o horário de verão?',
      'faq.a5': 'Sim. O GlobalTime Sync usa o banco de dados de fusos horários IANA através da API Intl do seu navegador, que lida automaticamente com as transições de horário de verão para todos os fusos horários suportados.',
      'faq.q6': 'Posso compartilhar os resultados do horário de reunião?',
      'faq.a6': 'Sim! Após encontrar o melhor horário de reunião, você pode usar o botão de copiar para copiar os resultados e compartilhá-los com sua equipe por e-mail, chat ou qualquer aplicativo de mensagens.',
      'footer.about': 'Sobre nós',
      'footer.howto': 'Como usar & FAQ',
      'footer.privacy': 'Política de Privacidade',
      'footer.terms': 'Termos de Serviço',
      'footer.copyright': '© 2026 GlobalTime Sync. Todos os direitos reservados.',
      'footer.feedback': 'Sugestões? Conte-nos',
      'feedback.title': 'Enviar feedback',
      'feedback.type': 'Tipo',
      'feedback.type.feature': 'Solicitação de recurso',
      'feedback.type.bug': 'Relatório de bug',
      'feedback.type.improve': 'Melhoria',
      'feedback.type.other': 'Outro',
      'feedback.message': 'Sua mensagem',
      'feedback.messagePlaceholder': 'Diga-nos o que você pensa...',
      'feedback.email': 'Seu e-mail (opcional)',
      'feedback.emailPlaceholder': 'seu@email.com',
      'feedback.send': 'Enviar feedback',
      'feedback.thanks': 'Obrigado pelo seu feedback!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    hi: {
      'nav.home': 'होम',
      'nav.about': 'हमारे बारे में',
      'nav.howto': 'कैसे उपयोग करें',
      'nav.timezones': 'समय क्षेत्र',
      'tagline': 'समय क्षेत्रों की तुरंत तुलना करें। आसानी से मीटिंग शेड्यूल करें।',
      'hero.title': 'समय क्षेत्रों में सही मीटिंग समय खोजें',
      'hero.desc': 'अपनी टीम के शहर जोड़ें, लाइव घड़ियां साथ-साथ देखें, और अगली मीटिंग के लिए सबसे अच्छा ओवरलैपिंग समय खोजें — सब मुफ्त।',
      'hero.share': 'अपनी टीम के साथ साझा करें:',
      'dashboard.title': 'समय क्षेत्र डैशबोर्ड',
      'dashboard.search': 'शहर या समय क्षेत्र खोजें...',
      'dashboard.addCity': '+ शहर जोड़ें',
      'dashboard.maxCities': 'अधिकतम 10 शहरों की अनुमति है।',
      'dashboard.duplicate': 'यह शहर पहले से जोड़ा गया है।',
      'meeting.title': 'मीटिंग ओवरलैप खोजक',
      'meeting.hint': 'कम से कम 2 शहर जोड़ें, फिर सबसे अच्छा मीटिंग समय खोजें।',
      'meeting.findBtn': 'सबसे अच्छा मीटिंग समय खोजें',
      'meeting.noOverlap': 'चयनित सभी शहरों में कोई ओवरलैपिंग कार्य समय नहीं मिला। कार्य समय समायोजित करें या शहरों की संख्या कम करें।',
      'meeting.perfect': 'पूर्ण ओवरलैप',
      'meeting.limited': 'सीमित विंडो',
      'meeting.tight': 'तंग विंडो',
      'meeting.copy': 'क्लिपबोर्ड पर कॉपी करें',
      'meeting.copied': 'कॉपी किया गया!',
      'meeting.share': 'साझा करें',
      'meeting.workHours': 'कार्य समय:',
      'meeting.to': 'से',
      'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
      'faq.q1': 'GlobalTime Sync कैसे काम करता है?',
      'faq.a1': 'GlobalTime Sync दुनिया के किसी भी शहर के लिए सटीक समय क्षेत्र डेटा प्रदर्शित करने के लिए आपके ब्राउज़र की अंतर्निहित Intl API का उपयोग करता है। बस शहर खोजें और जोड़ें।',
      'faq.q2': 'क्या GlobalTime Sync मुफ्त है?',
      'faq.a2': 'हां, GlobalTime Sync पूरी तरह से मुफ्त है। कोई साइन-अप, सदस्यता या छिपी फीस नहीं है।',
      'faq.q3': 'मैं समय क्षेत्रों में सबसे अच्छा मीटिंग समय कैसे खोजूं?',
      'faq.a3': 'अपनी टीम के सभी शहर जोड़ें, कार्य समय समायोजित करें, फिर "सबसे अच्छा मीटिंग समय खोजें" पर क्लिक करें।',
      'faq.q4': 'एक बार में कितने शहरों की तुलना कर सकता हूं?',
      'faq.a4': 'आप एक साथ 10 शहरों की तुलना कर सकते हैं।',
      'faq.q5': 'क्या GlobalTime Sync डेलाइट सेविंग टाइम को ध्यान में रखता है?',
      'faq.a5': 'हां। GlobalTime Sync IANA समय क्षेत्र डेटाबेस का उपयोग करता है जो स्वचालित रूप से DST परिवर्तनों को संभालता है।',
      'faq.q6': 'क्या मैं मीटिंग समय के परिणाम साझा कर सकता हूं?',
      'faq.a6': 'हां! कॉपी बटन का उपयोग करके परिणाम कॉपी करें और अपनी टीम के साथ साझा करें।',
      'footer.about': 'हमारे बारे में',
      'footer.howto': 'कैसे उपयोग करें & FAQ',
      'footer.privacy': 'गोपनीयता नीति',
      'footer.terms': 'सेवा की शर्तें',
      'footer.copyright': '© 2026 GlobalTime Sync. सर्वाधिकार सुरक्षित।',
      'footer.feedback': 'सुझाव? हमें बताएं',
      'feedback.title': 'प्रतिक्रिया भेजें',
      'feedback.type': 'प्रकार',
      'feedback.type.feature': 'सुविधा अनुरोध',
      'feedback.type.bug': 'बग रिपोर्ट',
      'feedback.type.improve': 'सुधार',
      'feedback.type.other': 'अन्य',
      'feedback.message': 'आपका संदेश',
      'feedback.messagePlaceholder': 'अपनी राय बताएं...',
      'feedback.email': 'आपका ईमेल (वैकल्पिक)',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': 'प्रतिक्रिया भेजें',
      'feedback.thanks': 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    ar: {
      'nav.home': 'الرئيسية',
      'nav.about': 'حول',
      'nav.howto': 'كيفية الاستخدام',
      'nav.timezones': 'المناطق الزمنية',
      'tagline': 'قارن المناطق الزمنية فوراً. جدول الاجتماعات بسهولة.',
      'hero.title': 'اعثر على وقت الاجتماع المثالي عبر المناطق الزمنية',
      'hero.desc': 'أضف المدن التي يتواجد فيها فريقك، شاهد الساعات الحية جنباً إلى جنب، واكتشف أفضل الأوقات المتداخلة لاجتماعك القادم — مجاناً.',
      'hero.share': 'شارك مع فريقك:',
      'dashboard.title': 'لوحة المناطق الزمنية',
      'dashboard.search': 'ابحث عن مدينة أو منطقة زمنية...',
      'dashboard.addCity': '+ إضافة مدينة',
      'dashboard.maxCities': 'الحد الأقصى 10 مدن.',
      'dashboard.duplicate': 'هذه المدينة مضافة بالفعل.',
      'meeting.title': 'باحث تداخل الاجتماعات',
      'meeting.hint': 'أضف مدينتين على الأقل، ثم ابحث عن أفضل وقت للاجتماع.',
      'meeting.findBtn': 'البحث عن أفضل وقت',
      'meeting.noOverlap': 'لم يتم العثور على ساعات عمل متداخلة. حاول تعديل ساعات العمل أو تقليل عدد المدن.',
      'meeting.perfect': 'تداخل مثالي',
      'meeting.limited': 'نافذة محدودة',
      'meeting.tight': 'نافذة ضيقة',
      'meeting.copy': 'نسخ إلى الحافظة',
      'meeting.copied': 'تم النسخ!',
      'meeting.share': 'مشاركة',
      'meeting.workHours': 'ساعات العمل:',
      'meeting.to': 'إلى',
      'faq.title': 'الأسئلة الشائعة',
      'faq.q1': 'كيف يعمل GlobalTime Sync؟',
      'faq.a1': 'يستخدم GlobalTime Sync واجهة Intl المدمجة في متصفحك لعرض بيانات المنطقة الزمنية الدقيقة لأي مدينة في العالم.',
      'faq.q2': 'هل GlobalTime Sync مجاني؟',
      'faq.a2': 'نعم، GlobalTime Sync مجاني تماماً. لا تسجيل ولا اشتراكات ولا رسوم خفية.',
      'faq.q3': 'كيف أجد أفضل وقت للاجتماع عبر المناطق الزمنية؟',
      'faq.a3': 'أضف جميع المدن وانقر على "البحث عن أفضل وقت". ستحسب الأداة ساعات العمل المتداخلة.',
      'faq.q4': 'كم عدد المدن التي يمكنني مقارنتها؟',
      'faq.a4': 'يمكنك مقارنة ما يصل إلى 10 مدن في وقت واحد.',
      'faq.q5': 'هل يراعي GlobalTime Sync التوقيت الصيفي؟',
      'faq.a5': 'نعم. يستخدم قاعدة بيانات IANA التي تتعامل تلقائياً مع تحولات التوقيت الصيفي.',
      'faq.q6': 'هل يمكنني مشاركة نتائج وقت الاجتماع؟',
      'faq.a6': 'نعم! استخدم زر النسخ لنسخ النتائج ومشاركتها مع فريقك.',
      'footer.about': 'من نحن',
      'footer.howto': 'كيفية الاستخدام',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.terms': 'شروط الخدمة',
      'footer.copyright': '© 2026 GlobalTime Sync. جميع الحقوق محفوظة.',
      'footer.feedback': 'اقتراحات؟ أخبرنا',
      'feedback.title': 'إرسال ملاحظات',
      'feedback.type': 'النوع',
      'feedback.type.feature': 'طلب ميزة',
      'feedback.type.bug': 'تقرير خطأ',
      'feedback.type.improve': 'تحسين',
      'feedback.type.other': 'أخرى',
      'feedback.message': 'رسالتك',
      'feedback.messagePlaceholder': 'أخبرنا برأيك...',
      'feedback.email': 'بريدك الإلكتروني (اختياري)',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': 'إرسال',
      'feedback.thanks': 'شكراً لملاحظاتك!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    ru: {
      'nav.home': 'Главная',
      'nav.about': 'О нас',
      'nav.howto': 'Как использовать',
      'nav.timezones': 'Часовые пояса',
      'tagline': 'Сравнивайте часовые пояса мгновенно. Планируйте встречи легко.',
      'hero.title': 'Найдите идеальное время для встречи в разных часовых поясах',
      'hero.desc': 'Добавьте города, где находится ваша команда, сравните живые часы и найдите лучшее пересечение рабочих часов — бесплатно.',
      'hero.share': 'Поделитесь с командой:',
      'dashboard.title': 'Панель часовых поясов',
      'dashboard.search': 'Поиск города или часового пояса...',
      'dashboard.addCity': '+ Добавить город',
      'dashboard.maxCities': 'Максимум 10 городов.',
      'dashboard.duplicate': 'Этот город уже добавлен.',
      'meeting.title': 'Поиск пересечения рабочих часов',
      'meeting.hint': 'Добавьте минимум 2 города, чтобы найти лучшее время для встречи.',
      'meeting.findBtn': 'Найти лучшее время',
      'meeting.noOverlap': 'Пересечение рабочих часов не найдено. Попробуйте изменить рабочие часы или уменьшить количество городов.',
      'meeting.perfect': 'Идеальное пересечение',
      'meeting.limited': 'Ограниченное окно',
      'meeting.tight': 'Узкое окно',
      'meeting.copy': 'Копировать в буфер',
      'meeting.copied': 'Скопировано!',
      'meeting.share': 'Поделиться',
      'meeting.workHours': 'Рабочие часы:',
      'meeting.to': 'до',
      'faq.title': 'Часто задаваемые вопросы',
      'faq.q1': 'Как работает GlobalTime Sync?',
      'faq.a1': 'GlobalTime Sync использует встроенный Intl API вашего браузера для отображения точных данных часовых поясов любого города мира.',
      'faq.q2': 'GlobalTime Sync бесплатный?',
      'faq.a2': 'Да, GlobalTime Sync полностью бесплатный. Без регистрации, подписок и скрытых платежей.',
      'faq.q3': 'Как найти лучшее время для встречи в разных часовых поясах?',
      'faq.a3': 'Добавьте все города и нажмите "Найти лучшее время". Инструмент рассчитает пересечение рабочих часов.',
      'faq.q4': 'Сколько городов можно сравнить одновременно?',
      'faq.a4': 'Можно сравнить до 10 городов одновременно.',
      'faq.q5': 'Учитывает ли GlobalTime Sync летнее время?',
      'faq.a5': 'Да. Используется база данных IANA, которая автоматически учитывает переход на летнее время.',
      'faq.q6': 'Можно ли поделиться результатами?',
      'faq.a6': 'Да! Скопируйте результаты и отправьте команде по почте или в мессенджере.',
      'footer.about': 'О нас',
      'footer.howto': 'Инструкция & FAQ',
      'footer.privacy': 'Политика конфиденциальности',
      'footer.terms': 'Условия использования',
      'footer.copyright': '© 2026 GlobalTime Sync. Все права защищены.',
      'footer.feedback': 'Предложения? Напишите нам',
      'feedback.title': 'Отправить отзыв',
      'feedback.type': 'Тип',
      'feedback.type.feature': 'Запрос функции',
      'feedback.type.bug': 'Сообщить об ошибке',
      'feedback.type.improve': 'Улучшение',
      'feedback.type.other': 'Другое',
      'feedback.message': 'Ваше сообщение',
      'feedback.messagePlaceholder': 'Расскажите, что вы думаете...',
      'feedback.email': 'Ваш email (необязательно)',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': 'Отправить отзыв',
      'feedback.thanks': 'Спасибо за ваш отзыв!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    },

    tr: {
      'nav.home': 'Ana Sayfa',
      'nav.about': 'Hakkında',
      'nav.howto': 'Nasıl Kullanılır',
      'nav.timezones': 'Saat Dilimleri',
      'tagline': 'Saat dilimlerini anında karşılaştırın. Toplantıları kolayca planlayın.',
      'hero.title': 'Saat Dilimleri Arasında Mükemmel Toplantı Zamanını Bulun',
      'hero.desc': 'Ekibinizin bulunduğu şehirleri ekleyin, canlı saatleri yan yana görün ve bir sonraki toplantınız için en iyi örtüşen saatleri keşfedin — tamamen ücretsiz.',
      'hero.share': 'Ekibinizle paylaşın:',
      'dashboard.title': 'Saat Dilimi Panosu',
      'dashboard.search': 'Şehir veya saat dilimi arayın...',
      'dashboard.addCity': '+ Şehir Ekle',
      'dashboard.maxCities': 'En fazla 10 şehir eklenebilir.',
      'dashboard.duplicate': 'Bu şehir zaten eklenmiş.',
      'meeting.title': 'Toplantı Örtüşme Bulucu',
      'meeting.hint': 'En az 2 şehir ekleyin, ardından en iyi toplantı zamanını bulun.',
      'meeting.findBtn': 'En İyi Zamanı Bul',
      'meeting.noOverlap': 'Seçilen şehirlerde örtüşen çalışma saati bulunamadı. Çalışma saatlerini ayarlamayı veya şehir sayısını azaltmayı deneyin.',
      'meeting.perfect': 'Mükemmel örtüşme',
      'meeting.limited': 'Sınırlı pencere',
      'meeting.tight': 'Dar pencere',
      'meeting.copy': 'Panoya kopyala',
      'meeting.copied': 'Kopyalandı!',
      'meeting.share': 'Paylaş',
      'meeting.workHours': 'Çalışma saatleri:',
      'meeting.to': '-',
      'faq.title': 'Sık Sorulan Sorular',
      'faq.q1': 'GlobalTime Sync nasıl çalışır?',
      'faq.a1': 'GlobalTime Sync, dünyadaki herhangi bir şehir için doğru saat dilimi verilerini görüntülemek üzere tarayıcınızın Intl API\'sini kullanır.',
      'faq.q2': 'GlobalTime Sync ücretsiz mi?',
      'faq.a2': 'Evet, tamamen ücretsizdir. Kayıt, abonelik veya gizli ücret yoktur.',
      'faq.q3': 'Saat dilimleri arasında en iyi toplantı zamanını nasıl bulurum?',
      'faq.a3': 'Tüm şehirleri ekleyin ve "En İyi Zamanı Bul" butonuna tıklayın.',
      'faq.q4': 'Aynı anda kaç şehri karşılaştırabilirim?',
      'faq.a4': 'Aynı anda 10 şehri karşılaştırabilirsiniz.',
      'faq.q5': 'GlobalTime Sync yaz saatini dikkate alıyor mu?',
      'faq.a5': 'Evet. IANA saat dilimi veritabanı üzerinden yaz saati geçişlerini otomatik olarak yönetir.',
      'faq.q6': 'Toplantı zamanı sonuçlarını paylaşabilir miyim?',
      'faq.a6': 'Evet! Kopyala butonunu kullanarak sonuçları ekibinizle paylaşabilirsiniz.',
      'footer.about': 'Hakkımızda',
      'footer.howto': 'Nasıl Kullanılır & SSS',
      'footer.privacy': 'Gizlilik Politikası',
      'footer.terms': 'Kullanım Şartları',
      'footer.copyright': '© 2026 GlobalTime Sync. Tüm hakları saklıdır.',
      'footer.feedback': 'Önerileriniz mi var? Bize bildirin',
      'feedback.title': 'Geri Bildirim Gönder',
      'feedback.type': 'Tür',
      'feedback.type.feature': 'Özellik İsteği',
      'feedback.type.bug': 'Hata Bildirimi',
      'feedback.type.improve': 'İyileştirme',
      'feedback.type.other': 'Diğer',
      'feedback.message': 'Mesajınız',
      'feedback.messagePlaceholder': 'Düşüncelerinizi paylaşın...',
      'feedback.email': 'E-postanız (isteğe bağlı)',
      'feedback.emailPlaceholder': 'your@email.com',
      'feedback.send': 'Gönder',
      'feedback.thanks': 'Geri bildiriminiz için teşekkürler!',
      'lang.en': 'English', 'lang.ko': '한국어', 'lang.ja': '日本語', 'lang.zh': '中文',
      'lang.es': 'Español', 'lang.fr': 'Français', 'lang.de': 'Deutsch', 'lang.pt': 'Português',
      'lang.hi': 'हिन्दी', 'lang.ar': 'العربية', 'lang.ru': 'Русский', 'lang.tr': 'Türkçe'
    }
  };

  // --- Language Detection ---
  function detectLanguage() {
    // 1. URL parameter ?lang=xx
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;

    // 2. localStorage preference
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

    // 3. Browser language
    var browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;

    return DEFAULT_LANG;
  }

  // --- Translation Helper ---
  function t(key) {
    var lang = window.__gtsLang || DEFAULT_LANG;
    var dict = T[lang] || T[DEFAULT_LANG];
    return dict[key] || T[DEFAULT_LANG][key] || key;
  }

  // --- Apply Translations to Page ---
  function applyTranslations(lang) {
    window.__gtsLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // Set HTML lang & dir
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });

    // Translate elements with data-i18n-title (for tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = t(el.getAttribute('data-i18n-title'));
    });

    // Translate elements with data-i18n-aria (for aria-label)
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // Update language selector display
    var langDisplay = document.getElementById('current-lang-display');
    if (langDisplay) {
      langDisplay.textContent = t('lang.' + lang);
    }

    // Mark active language in dropdown
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Update page title based on current page
    updatePageTitle(lang);
  }

  function updatePageTitle(lang) {
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
      var titles = {
        en: 'GlobalTime Sync — Free Time Zone Converter & Meeting Scheduler',
        ko: 'GlobalTime Sync — 무료 시간대 변환기 & 회의 스케줄러',
        ja: 'GlobalTime Sync — 無料タイムゾーン変換 & 会議スケジューラー',
        zh: 'GlobalTime Sync — 免费时区转换器和会议安排工具',
        es: 'GlobalTime Sync — Convertidor de Zonas Horarias Gratis',
        fr: 'GlobalTime Sync — Convertisseur de Fuseaux Horaires Gratuit',
        de: 'GlobalTime Sync — Kostenloser Zeitzonen-Konverter',
        pt: 'GlobalTime Sync — Conversor de Fusos Horários Grátis',
        hi: 'GlobalTime Sync — मुफ्त समय क्षेत्र कनवर्टर',
        ar: 'GlobalTime Sync — محول المناطق الزمنية المجاني',
        ru: 'GlobalTime Sync — Бесплатный конвертер часовых поясов',
        tr: 'GlobalTime Sync — Ücretsiz Saat Dilimi Dönüştürücü'
      };
      document.title = titles[lang] || titles.en;

      var metaDesc = {
        en: 'Compare time zones across cities instantly. Find the best meeting time for your global team. Free, no sign-up required.',
        ko: '전 세계 도시의 시간대를 즉시 비교하세요. 글로벌 팀을 위한 최적의 회의 시간을 찾으세요. 무료, 가입 불필요.',
        ja: '世界中の都市のタイムゾーンを即座に比較。グローバルチームのための最適な会議時間を見つけましょう。無料、登録不要。',
        zh: '即时比较全球城市时区。为您的全球团队找到最佳会议时间。免费，无需注册。',
        es: 'Compara zonas horarias de ciudades al instante. Encuentra el mejor horario de reunión para tu equipo global. Gratis, sin registro.',
        fr: 'Comparez instantanément les fuseaux horaires. Trouvez le meilleur créneau de réunion pour votre équipe. Gratuit, sans inscription.',
        de: 'Vergleichen Sie Zeitzonen sofort. Finden Sie die beste Meetingzeit für Ihr globales Team. Kostenlos, ohne Anmeldung.',
        pt: 'Compare fusos horários instantaneamente. Encontre o melhor horário de reunião para sua equipe global. Grátis, sem cadastro.',
        hi: 'शहरों के समय क्षेत्रों की तुरंत तुलना करें। अपनी वैश्विक टीम के लिए सबसे अच्छा मीटिंग समय खोजें। मुफ्त।',
        ar: 'قارن المناطق الزمنية فوراً. اعثر على أفضل وقت اجتماع لفريقك العالمي. مجاني.',
        ru: 'Сравнивайте часовые пояса мгновенно. Найдите лучшее время для встречи. Бесплатно, без регистрации.',
        tr: 'Saat dilimlerini anında karşılaştırın. Ekibiniz için en iyi toplantı zamanını bulun. Ücretsiz.'
      };
      var descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.content = metaDesc[lang] || metaDesc.en;
    }
  }

  // --- Create Language Selector UI ---
  function createLangSelector() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'lang-selector';
    wrapper.innerHTML =
      '<button class="lang-toggle" id="lang-toggle" aria-label="Change language" aria-expanded="false">' +
        '<span class="lang-globe">&#127760;</span> ' +
        '<span id="current-lang-display">' + t('lang.' + (window.__gtsLang || DEFAULT_LANG)) + '</span>' +
        ' <span class="lang-arrow">&#9662;</span>' +
      '</button>' +
      '<div class="lang-dropdown" id="lang-dropdown">' +
        SUPPORTED_LANGS.map(function (code) {
          return '<button class="lang-option' + (code === window.__gtsLang ? ' active' : '') + '" data-lang="' + code + '">' +
            t('lang.' + code) + '</button>';
        }).join('') +
      '</div>';

    nav.appendChild(wrapper);

    // Toggle dropdown
    var toggle = document.getElementById('lang-toggle');
    var dropdown = document.getElementById('lang-dropdown');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Language selection
    dropdown.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-option');
      if (!btn) return;
      var lang = btn.dataset.lang;
      applyTranslations(lang);
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      // Update URL param without reload
      var url = new URL(window.location);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    });

    // Close on outside click
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // --- Create Feedback Panel ---
  function createFeedbackPanel() {
    // Remove old floating feedback button if exists
    var oldBtn = document.querySelector('.floating-feedback');
    if (oldBtn) oldBtn.remove();

    // Create new floating button + panel
    var container = document.createElement('div');
    container.className = 'feedback-container';
    container.innerHTML =
      '<button class="feedback-fab" id="feedback-fab" aria-label="' + t('feedback.title') + '" title="' + t('feedback.title') + '">' +
        '<span class="feedback-fab-icon">&#9993;</span>' +
      '</button>' +
      '<div class="feedback-panel" id="feedback-panel" aria-hidden="true">' +
        '<div class="feedback-panel-header">' +
          '<h4 data-i18n="feedback.title">' + t('feedback.title') + '</h4>' +
          '<button class="feedback-close" id="feedback-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<form id="feedback-form" class="feedback-form">' +
          '<label data-i18n="feedback.type">' + t('feedback.type') + '</label>' +
          '<select id="feedback-type" name="type">' +
            '<option value="feature" data-i18n="feedback.type.feature">' + t('feedback.type.feature') + '</option>' +
            '<option value="bug" data-i18n="feedback.type.bug">' + t('feedback.type.bug') + '</option>' +
            '<option value="improve" data-i18n="feedback.type.improve">' + t('feedback.type.improve') + '</option>' +
            '<option value="other" data-i18n="feedback.type.other">' + t('feedback.type.other') + '</option>' +
          '</select>' +
          '<label data-i18n="feedback.message">' + t('feedback.message') + '</label>' +
          '<textarea id="feedback-msg" name="message" rows="4" data-i18n="feedback.messagePlaceholder" placeholder="' + t('feedback.messagePlaceholder') + '" required></textarea>' +
          '<label data-i18n="feedback.email">' + t('feedback.email') + '</label>' +
          '<input type="email" id="feedback-email" name="email" data-i18n="feedback.emailPlaceholder" placeholder="' + t('feedback.emailPlaceholder') + '">' +
          '<button type="submit" class="btn btn-primary feedback-submit" data-i18n="feedback.send">' + t('feedback.send') + '</button>' +
        '</form>' +
        '<div class="feedback-success" id="feedback-success" style="display:none">' +
          '<span class="feedback-check">&#10003;</span>' +
          '<p data-i18n="feedback.thanks">' + t('feedback.thanks') + '</p>' +
        '</div>' +
      '</div>';

    document.body.appendChild(container);

    // Toggle panel
    var fab = document.getElementById('feedback-fab');
    var panel = document.getElementById('feedback-panel');
    var closeBtn = document.getElementById('feedback-close');

    fab.addEventListener('click', function () {
      var isOpen = panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', !isOpen);
      fab.classList.toggle('active', isOpen);
    });

    closeBtn.addEventListener('click', function () {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      fab.classList.remove('active');
    });

    // Form submit → mailto
    document.getElementById('feedback-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var type = document.getElementById('feedback-type').value;
      var msg = document.getElementById('feedback-msg').value;
      var email = document.getElementById('feedback-email').value;

      var subject = encodeURIComponent('GlobalTime Sync Feedback: [' + type.toUpperCase() + ']');
      var body = encodeURIComponent(
        'Type: ' + type + '\n' +
        'Message: ' + msg + '\n' +
        (email ? 'Reply to: ' + email + '\n' : '') +
        '\n---\nLanguage: ' + (window.__gtsLang || 'en') +
        '\nURL: ' + window.location.href +
        '\nUser Agent: ' + navigator.userAgent
      );

      window.location.href = 'mailto:taeshinkim11@gmail.com?subject=' + subject + '&body=' + body;

      // Show success
      document.getElementById('feedback-form').style.display = 'none';
      document.getElementById('feedback-success').style.display = 'flex';

      setTimeout(function () {
        document.getElementById('feedback-form').style.display = '';
        document.getElementById('feedback-success').style.display = 'none';
        document.getElementById('feedback-form').reset();
        panel.classList.remove('open');
        fab.classList.remove('active');
      }, 3000);
    });
  }

  // --- Initialize i18n ---
  function initI18n() {
    var lang = detectLanguage();
    window.__gtsLang = lang;
    createLangSelector();
    createFeedbackPanel();
    applyTranslations(lang);
  }

  // --- Expose globally ---
  window.GTS_i18n = {
    t: t,
    applyTranslations: applyTranslations,
    detectLanguage: detectLanguage,
    SUPPORTED_LANGS: SUPPORTED_LANGS
  };

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
})();
