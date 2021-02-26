import Loading from '@components/loaders/Loading';
import { signIn, useSession } from 'next-auth/client';

const Index = () => {
  const [session, loading] = useSession();
  return (
    <div className="py-10 flex flex-col justify-center">
      <div className=" font-extrabold  mb-20">
        <p className="text-5xl mx-auto text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 pb-6">
          Keşke Atansam
        </p>
        <p className="italic  text-center pb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          okul öncesi için kpss atama simülasyonu
        </p>
        <p className="text-md font-normal mt-4 bg-white rounded m-2 shadow-lg overflow-hidden p-4">
          Bu uygulama{' '}
          <a href="https://prepokul.com" className="text-blue-400 font-bold" target="_blank">
            Prepokul
          </a>{' '}
          sponsorluğunda geliştirilmiştir. <br />
          Okul öncesi eğitime dair kaliteli içeriklerin üretildiği bu sayfada yakın zamanda siz
          değerli öğretmenlerimizin yazılarını ve etkinliklerini de yayınlamaya başlayacağız.
          <br />
          <a href="https://instagram.com/prepokul" className="text-blue-400 font-bold">
            Instagram hesabını
          </a>{' '}
          takip ederek destek olabilir bizleri mutlu edebilirsiniz.
        </p>
        <div className="bg-white rounded m-2 shadow-lg overflow-hidden">
          <p className="bg-blue-200 p-4">Uygulamaya kaydolurken şunlar aklınızda bulunsun:</p>
          <ul className="font-normal">
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Uygulamaya kaydolmak için Gmail hesabınızın olması gerekir.
            </li>
            <li className="px-4 py-2 border-b-2 text-left  hover:bg-blue-100 cursor-pointer">
              Uygulamaya kaydolmak için giriş butonuna tıklamanız yeterlidir.
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Açılan sayfadaki <span className="font-bold">Google ile giriş yap</span> butonuna
              tıklayınız.
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Uygulama sizi <span className="font-bold">P-121</span> sıralamanızı girebileceğiniz
              sayfaya yönlendirecektir.
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer ">
              Derecenizi <span className="font-bold">sadece bir kez</span> girme şansına sahipsiniz.
              Meslektaşlarınızı yanıltmamak adına derecenizi doğru girmeniz önemle rica olunur.
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Uygulama şu an okullar açıklanmadığı ve son sıralamanız(mülakat puanı vs.)
              netleşmediği için test verileri ile yapılandırılmıştır.{' '}
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Okullar ve sıralamalar belli olduğunda tüm veriler(kullanıcı profilleri ve okullar)
              silinip yeniden kullanıma açılacaktır.
            </li>

            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Uygulamaya kaydolup tercih yaptığınızda gmail adresiniz diğer kullanıcılar tarafından
              görülebilecektir. Her bir okulun sayfasında o okulu tercih edenler listelenecektir.
              İsimlerinin yanındaki mektup işaretine tıklayarak kullanıcıya mail atabilirsiniz.
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Uygulama ile ilgili talepleriniz ve düşünceleriniz için her zaman{' '}
              <a href="https://instagram.com/uguremirmustafa" className="text-blue-400 font-bold">
                bana ulaşabilirsiniz.
              </a>
            </li>
            <li className="px-4 py-2 border-b-2 text-left hover:bg-blue-100 cursor-pointer">
              Uygulamaya üye olup test ettiğiniz için teşekkürler.
            </li>
          </ul>
        </div>
      </div>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {!loading && !session && (
        <button
          className="mx-auto py-2 px-4 bg-green-500 text-white rounded-full w-40 mb-20 font-bold"
          onClick={() => signIn()}
        >
          Giriş Yap
        </button>
      )}
    </div>
  );
};

export default Index;
