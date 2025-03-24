import { generatePath, Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';
import CalculateRating from '../../utils';
import cn from 'classnames';

type PlacesCardProps = {
  placeOffer: Offer;
  onCardHover?: (offer?: Offer) => void;
  variant?: 'cities' | 'favorites';
};

// Объекты с настройками для разных вариантов карточки
const cardClasses = {
  cities: 'cities__card place-card',
  favorites: 'favorites__card place-card',
};

const imageWrapperClasses = {
  cities: 'cities__image-wrapper place-card__image-wrapper',
  favorites: 'favorites__image-wrapper place-card__image-wrapper',
};

const imageSizes = {
  cities: {
    width: 260,
    height: 200,
  },
  favorites: {
    width: 150,
    height: 110,
  },
};

function PlacesCard({
  placeOffer,
  onCardHover,
  variant = 'cities',
}: PlacesCardProps): JSX.Element {
  const containerClass = cardClasses[variant];
  const imageWrapperClass = imageWrapperClasses[variant];
  const { width, height } = imageSizes[variant];

  return (
    <article
      className={containerClass}
      onMouseEnter={() => onCardHover && onCardHover(placeOffer)}
      onMouseLeave={() => onCardHover && onCardHover()}
    >
      {placeOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={generatePath(AppRoute.Offer, { id: placeOffer.id })}>
          <img
            className="place-card__image"
            src={placeOffer.previewImage}
            width={width}
            height={height}
            alt={placeOffer.title}
          />
        </Link>
      </div>
      <div
        className={cn(
          'place-card__info',
          variant === 'favorites' && 'favorites__card-info'
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{placeOffer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button button',
              placeOffer.isFavorite && 'place-card__bookmark-button--active'
            )}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {placeOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${CalculateRating(placeOffer)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: placeOffer.id })}>
            {placeOffer.title}
          </Link>
        </h2>
        <p className="place-card__type">{placeOffer.type}</p>
      </div>
    </article>
  );
}

export default PlacesCard;
