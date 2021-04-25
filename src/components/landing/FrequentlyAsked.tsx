import { FaPlus } from 'react-icons/fa';

const FrequentlyAsked: React.FC = () => {

  const openAnswer = (e: any) => {
    e.target.closest('.question').querySelector('.question__answer').classList.toggle('hidden');
    e.target.closest('.question').querySelector('.plus').classList.toggle('open');
  };

  return (
    <>
      <section className="frequently-asked section-in-home">
        <div className="frequently-asked__text">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="frequently-asked__questions">
          <div className="question">
            <div className="question__title" onClick={openAnswer}>
              <h3>What is Netflix?</h3>
              <span className="plus"><FaPlus /></span>
            </div>
            <div className="question__answer hidden">
              <h3>
                Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime,   documentaries and more – on thousands of internet-connected devices.You can watch as much as you want, whenever you want, without a single  ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!
              </h3>
            </div>
          </div>
          <div className="question">
            <div className="question__title" onClick={openAnswer}>
              <h3>How much does Netflix cost?</h3>
              <span className="plus"><FaPlus /></span>
            </div>
            <div className="question__answer hidden">
              <h3>
                Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 199 to ₹ 799 a month. No extra costs, no contracts.
              </h3>
            </div>
          </div>
          <div className="question">
            <div className="question__title" onClick={openAnswer}>
              <h3>Where can I watch?</h3>
              <span className="plus"><FaPlus /></span>
            </div>
            <div className="question__answer hidden">
              <h3>
                Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
              </h3>
            </div>
          </div>
          <div className="question">
            <div className="question__title" onClick={openAnswer}>
              <h3>How do I cancel?</h3>
              <span className="plus"><FaPlus /></span>
            </div>
            <div className="question__answer hidden">
              <h3>
                Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
              </h3>
            </div>
          </div>
          <div className="question">
            <div className="question__title" onClick={openAnswer}>
              <h3>What can I watch on Netflix?</h3>
              <span className="plus"><FaPlus /></span>
            </div>
            <div className="question__answer hidden">
              <h3>
                Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FrequentlyAsked;