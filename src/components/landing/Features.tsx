import tv from './../../assets/tv.png';
import phone from './../../assets/mobile.jpg';
import devises from './../../assets/devices.png';

const Features: React.FC = () => {
  return (
    <>
      <section className='enjoy-on-tv section-in-home'>
        <div className="grid-2">
          <div className="grid-2__text">
            <h2>Enjoy on your TV.</h2>
            <h4>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h4>
          </div>
          <div className="grid-2__image">
            <img src={tv} alt="Enjoy on your TV" />
          </div>
        </div>
      </section>

      <section className='download-shows section-in-home'>
        <div className="grid-2 grid-2--reversed">
          <div className="grid-2__text">
            <h2>Download your shows to watch offline.</h2>
            <h4>Save your favourites easily and always have something to watch.</h4>
          </div>
          <div className="grid-2__image">
            <img src={phone} alt="Download your favorite shows" />
          </div>
        </div>
      </section>

      <section className='watch-everywhere section-in-home'>
        <div className="grid-2">
          <div className="grid-2__text">
            <h2>Watch everywhere.</h2>
            <h4>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h4>
          </div>
          <div className="grid-2__image">
            <img src={devises} alt="Enjoy on your TV" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;