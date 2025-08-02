export default function TermsOfUse() {
  // 連絡先メールアドレス
  const email = "[ここに連絡先メールアドレスを記載]";
  // TODO: オブジェを探せゲームの利用規約をここに記載
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            「オブジェを探せゲーム」
            <br />
            利用規約
          </h1>

          {/* ----- 第1章 総則 ----- */}
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              第1章 総則
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第1条（本規約への同意）
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              この利用規約（以下「本規約」といいます。）は、金沢工業大学の学生有志（以下「当団体」といいます。）が開発・運営するウェブアプリケーション「オブジェを探せゲーム」（以下「本サービス」といいます。）の利用条件を定めるものです。
            </p>
            <p className="text-gray-700 leading-relaxed">
              本サービスを利用する者（以下「利用者」といいます。）は、本サービスを利用したことをもって、本規約の全ての記載内容に同意したものとみなされます。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第2条（本規約の適用）
            </h3>
            <p className="text-gray-700 leading-relaxed">
              本規約は、利用者が本サービスを利用する上での一切の関係に適用されます。
            </p>
          </section>

          <hr className="my-8 border-gray-200" />

          {/* ----- 第2章 本サービスの利用 ----- */}
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              第2章 本サービスの利用
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第3条（本サービスの目的と機能）
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              本サービスは、金沢市額地区の地域振興を目的とし、同地区内に設置されたオブジェを発見するゲーム機能を提供します。
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              利用者は、本サービスを通じて以下の機能を利用することができます。
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 leading-relaxed">
              <li>エリア内のマップ表示機能</li>
              <li>QRコードを用いたオブジェ発見記録機能</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第4条（利用料金）
            </h3>
            <p className="text-gray-700 leading-relaxed">
              本サービスの利用は無料とします。ただし、本サービスの利用に必要なスマートフォン等の端末、およびインターネットへの接続にかかる通信料は利用者の負担となります。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第5条（禁止事項）
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700 leading-relaxed">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                本サービスのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
              </li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>他の利用者に成りすます行為</li>
              <li>
                本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
              </li>
              <li>
                当団体、本サービスの他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
              </li>
              <li>
                オブジェが設置されている私有地や建物等へ、許可なく立ち入る行為
              </li>
              <li>その他、当団体が不適切と判断する行為</li>
            </ul>
          </section>

          <hr className="my-8 border-gray-200" />

          {/* ----- 第3章 運営等 ----- */}
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              第3章 運営等
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第6条（本サービスの提供の停止等）
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              当団体は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-gray-700 leading-relaxed mb-4">
              <li>
                本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
              </li>
              <li>
                地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
              </li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当団体が本サービスの提供が困難と判断した場合</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              当団体は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第7条（知的財産権）
            </h3>
            <p className="text-gray-700 leading-relaxed">
              本サービスに関する知的財産権は、全て当団体または当団体にライセンスを許諾している者に帰属しており、本規約に基づく本サービスの利用許諾は、本サービスに関する当団体または当団体にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第8条（免責事項）
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              当団体は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              本サービスは、学生によるプロジェクトの一環として、現状有姿で提供されるものであり、当団体は、本サービスに起因して利用者に生じたあらゆる損害について一切の責任を負いません。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              利用者は、自己の責任において、周囲の安全（交通状況、歩行者、障害物等）を十分に確認し、法令及び交通ルールを遵守した上で本サービスを利用するものとします。特に、
              <strong className="font-semibold">
                歩行中や自転車乗車中にスマートフォンを操作する、いわゆる「歩きスマホ」等の行為は大変危険ですので絶対におやめください。
              </strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              本サービスの利用中に発生した、利用者自身の怪我、疾病、事故、または利用者が第三者に与えた損害（物損・人身を含む）その他一切のトラブルについて、当団体は一切の責任を負いません。
            </p>
            <p className="text-gray-700 leading-relaxed">
              オブジェの設置場所やその周辺で発生した事故、トラブル等についても、当団体は一切の責任を負いません。
              <strong className="font-semibold">
                立ち入りが禁止されている場所や危険な場所には絶対に立ち入らないでください。
              </strong>
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第9条（利用者情報の取扱い）
            </h3>
            <p className="text-gray-700 leading-relaxed">
              当団体は、本サービスの利用によって取得する利用者情報については、別途定める「プライバシーポリシー」に従い適切に取り扱うものとします。
            </p>
          </section>

          <hr className="my-8 border-gray-200" />

          {/* ----- 第4章 その他 ----- */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              第4章 その他
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第10条（利用規約の変更）
            </h3>
            <p className="text-gray-700 leading-relaxed">
              当団体は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、本サービス上への掲載をもってその効力を生じるものとし、変更後に本サービスを利用した利用者は、変更後の規約に同意したものとみなします。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第11条（準拠法・裁判管轄）
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              本規約の解釈にあたっては、日本法を準拠法とします。
            </p>
            <p className="text-gray-700 leading-relaxed">
              本サービスに関して紛争が生じた場合には、金沢地方裁判所を第一審の専属的合意管轄とします。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              第12条（お問い合わせ）
            </h3>
            <p className="text-gray-700 leading-relaxed">
              本サービスに関するお問い合わせは、以下の連絡先までお願いいたします。
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              連絡先：
              <a
                href="mailto:[ここに連絡先メールアドレスを記載]"
                className="text-blue-600 hover:underline"
              >
                {email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
