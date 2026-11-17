
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';

type MarbleCloudsProps = {
  hostRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
};

type Cloud = {
  id: 0 | 1 | 2;
  x: number;
  size: number;
  driftX: number;
  duration: number;
  delay: number;
  variant: 0 | 1 | 2;
};

type PaintLayer = {
  d: string;
  fill: string;
  opacity?: number;
};

type PaintVein = {
  d: string;
  color: string;
  width: number;
  opacity?: number;
};

type Painting = {
  silhouette: string;
  layers: PaintLayer[];
  veins: PaintVein[];
};


const paintings: [Painting, Painting] = [
  {
    silhouette: [
      'M18 333',
      'C58 280 118 316 145 267',
      'C182 204 118 175 178 124',
      'C214 92 259 134 281 99',
      'C300 59 345 28 404 40',
      'C438 49 465 5 509 10',
      'C475 40 499 77 535 73',
      'C525 117 473 140 449 173',
      'C425 207 472 232 542 215',
      'C525 278 453 271 400 294',
      'C353 312 365 393 292 412',
      'C242 430 204 375 151 393',
      'C97 411 55 391 18 333',
      'Z',
    ].join(' '),

    layers: [
      {
        fill: '#F5A8AE',
        d: [
          'M-10 365',
          'C65 307 129 348 168 291',
          'C215 230 160 191 215 143',
          'C263 100 293 156 324 109',
          'C352 65 414 84 475 25',
          'C466 88 420 133 394 184',
          'C373 231 439 250 509 233',
          'C457 292 398 278 358 329',
          'C299 414 235 393 161 416',
          'L-10 433 Z',
        ].join(' '),
      },
      {
        fill: '#DB697D',
        d: [
          'M-12 385',
          'C83 326 151 372 191 306',
          'C233 243 185 207 239 163',
          'C282 129 318 175 351 125',
          'C392 75 438 82 494 40',
          'C469 120 401 163 405 213',
          'C414 261 474 265 529 249',
          'C465 304 411 308 376 350',
          'C324 414 231 428 155 430',
          'L-12 438 Z',
        ].join(' '),
      },
      {
        fill: '#AD3B58',
        d: [
          'M10 401',
          'C96 339 172 390 218 327',
          'C271 260 207 223 266 183',
          'C309 154 343 193 381 142',
          'C424 94 454 91 508 65',
          'C462 145 430 181 439 221',
          'C449 264 482 279 533 265',
          'C481 325 434 313 406 366',
          'C364 435 276 447 202 430',
          'C128 414 67 452 10 401 Z',
        ].join(' '),
      },
      {
        fill: '#742941',
        opacity: 0.95,
        d: [
          'M52 413',
          'C138 368 191 398 242 336',
          'C287 280 242 247 292 204',
          'C328 173 365 207 406 157',
          'C437 118 477 102 518 89',
          'C483 156 459 193 463 231',
          'C467 268 511 288 551 276',
          'C500 342 462 344 433 389',
          'C395 449 302 451 237 432',
          'C153 410 101 449 52 413 Z',
        ].join(' '),
      },
      {
        fill: '#E88994',
        d: [
          'M28 321',
          'C67 287 119 302 149 254',
          'C180 211 151 182 176 151',
          'C194 124 220 138 226 160',
          'C233 183 203 207 198 232',
          'C188 275 210 291 180 331',
          'C137 379 70 345 28 360 Z',
        ].join(' '),
      },
      {
        fill: '#FAD0C9',
        opacity: 0.95,
        d: [
          'M127 332',
          'C169 306 191 282 184 246',
          'C178 213 158 187 181 158',
          'C191 146 206 151 212 164',
          'C196 170 198 188 206 202',
          'C245 253 222 310 177 341',
          'C154 355 132 350 127 332 Z',
        ].join(' '),
      },
      {
        fill: '#E87784',
        d: [
          'M398 44',
          'C433 66 469 52 499 13',
          'C480 57 490 92 516 96',
          'C475 115 440 116 415 95',
          'C401 83 396 64 398 44 Z',
        ].join(' '),
      },
    ],

    veins: [
      {
        d: [
          'M36 347',
          'C102 301 142 346 178 284',
          'C218 224 168 198 213 156',
          'C249 118 293 165 322 123',
          'C349 83 394 73 444 52',
        ].join(' '),
        color: '#FFDED3',
        width: 9,
        opacity: 0.83,
      },
      {
        d: [
          'M75 390',
          'C147 355 198 411 257 341',
          'C304 284 252 251 301 213',
          'C346 177 366 217 415 157',
          'C448 118 476 103 504 97',
        ].join(' '),
        color: '#F3A1A8',
        width: 11,
        opacity: 0.86,
      },
      {
        d: [
          'M121 378',
          'C180 360 215 383 249 355',
          'C292 322 295 288 273 258',
        ].join(' '),
        color: '#F8C3BE',
        width: 4,
        opacity: 0.78,
      },
    ],
  },

  {
    silhouette: [
      'M16 193',
      'C61 218 95 167 141 170',
      'C194 174 202 115 246 87',
      'C292 57 345 97 369 57',
      'C393 15 436 16 468 30',
      'C449 55 464 83 513 90',
      'C546 97 545 136 518 159',
      'C486 180 457 155 437 184',
      'C403 234 467 270 512 248',
      'C503 303 457 335 416 313',
      'C372 287 362 318 348 354',
      'C324 418 267 438 230 388',
      'C202 348 160 374 124 397',
      'C79 426 42 389 47 347',
      'C53 299 93 273 63 240',
      'C47 223 30 217 16 193',
      'Z',
    ].join(' '),

    layers: [
      {
        fill: '#F6B5B4',
        d: [
          'M-10 195',
          'C63 240 109 187 151 202',
          'C201 217 227 139 265 112',
          'C312 77 350 121 392 68',
          'C422 34 457 45 487 60',
          'C453 102 491 127 530 115',
          'C510 165 464 162 441 210',
          'C428 238 471 273 521 265',
          'C489 330 442 338 400 310',
          'C361 292 357 345 336 388',
          'C303 445 239 410 208 380',
          'C160 340 124 419 66 407',
          'L-10 320 Z',
        ].join(' '),
      },
      {
        fill: '#D55A70',
        d: [
          'M15 222',
          'C90 259 118 200 167 221',
          'C216 241 241 156 283 132',
          'C318 104 371 151 413 88',
          'C445 51 472 80 500 86',
          'C471 131 477 168 446 223',
          'C425 270 486 298 526 279',
          'C499 347 444 354 397 325',
          'C352 301 377 367 319 407',
          'C268 442 235 384 203 372',
          'C144 348 100 420 50 397',
          'Z',
        ].join(' '),
      },
      {
        fill: '#A83856',
        d: [
          'M24 241',
          'C98 277 141 225 188 242',
          'C243 268 254 183 299 151',
          'C345 119 376 172 425 106',
          'C454 75 480 102 515 112',
          'C478 156 474 199 464 238',
          'C449 286 500 315 536 301',
          'C497 373 439 374 386 347',
          'C340 324 360 386 303 426',
          'C250 439 221 388 182 384',
          'C130 371 85 431 43 387 Z',
        ].join(' '),
      },
      {
        fill: '#702A43',
        d: [
          'M53 258',
          'C120 292 151 249 206 264',
          'C261 280 274 206 323 172',
          'C369 139 389 184 440 129',
          'C477 96 499 132 538 122',
          'C489 173 498 218 477 261',
          'C468 302 518 329 548 320',
          'C508 380 450 389 391 358',
          'C347 344 351 407 286 433',
          'C250 437 213 392 174 390',
          'C121 380 89 424 53 393 Z',
        ].join(' '),
        opacity: 0.94,
      },
      {
        fill: '#F6A0A7',
        d: [
          'M75 173',
          'C119 179 135 142 164 123',
          'C185 107 214 118 219 141',
          'C221 164 197 188 176 192',
          'C149 196 110 197 75 173 Z',
        ].join(' '),
      },
      {
        fill: '#F9CDC7',
        d: [
          'M329 339',
          'C358 293 356 257 336 229',
          'C320 204 319 182 341 160',
          'C352 150 369 154 377 169',
          'C359 181 360 195 373 216',
          'C410 272 391 328 352 365',
          'C334 379 319 367 329 339 Z',
        ].join(' '),
      },
    ],

    veins: [
      {
        d: [
          'M40 208',
          'C100 240 133 184 176 200',
          'C218 218 238 152 281 119',
          'C321 87 361 138 398 86',
          'C430 49 462 66 489 72',
        ].join(' '),
        color: '#FFDFD7',
        width: 9,
        opacity: 0.83,
      },
      {
        d: [
          'M69 279',
          'C139 311 166 246 217 273',
          'C267 298 286 224 326 184',
          'C357 151 392 195 438 149',
        ].join(' '),
        color: '#EFA0A8',
        width: 12,
        opacity: 0.86,
      },
      {
        d: [
          'M192 380',
          'C246 355 252 409 295 386',
          'C330 369 334 318 353 297',
        ].join(' '),
        color: '#F7BDBA',
        width: 5,
        opacity: 0.8,
      },
    ],
  },
];


const initialClouds: Cloud[] = [
  {
    id: 0,
    x: 31,
    size: 330,
    driftX: 210,
    duration: 48,
    delay: -20,
    variant: 0,
  },
  {
    id: 1,
    x: 60,
    size: 315,
    driftX: 175,
    duration: 53,
    delay: -35,
    variant: 1,
  },
  {
    id: 2,
    x: 84,
    size: 285,
    driftX: 245,
    duration: 47,
    delay: -8,
    variant: 2,
  },
];

const lanes = [
  { minX: 28, maxX: 35, minSize: 300, maxSize: 350 },
  { minX: 57, maxX: 65, minSize: 285, maxSize: 335 },
  { minX: 81, maxX: 89, minSize: 260, maxSize: 315 },
] as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}


function nextCloud(cloud: Cloud): Cloud {
  const lane = lanes[cloud.id];

  return {
    ...cloud,
    x: randomBetween(lane.minX, lane.maxX),
    size: randomBetween(lane.minSize, lane.maxSize),
    driftX: randomBetween(155, 275),
    variant: Math.floor(Math.random() * 3) as 0 | 1 | 2,
  };
}

function MarbleArtwork({
  id,
  variant,
}: {
  id: number;
  variant: 0 | 1 | 2;
}) {
  const painting = paintings[variant === 1 ? 1 : 0];
  const mirrored = variant === 2;

  const clipId = `forma-marble-shape-${id}`;

  return (
    <svg
      className="hero-marble__art"
      viewBox="0 0 560 440"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={painting.silhouette} />
        </clipPath>
      </defs>

      <g
        transform={
          mirrored
            ? 'translate(560 0) scale(-1 1)'
            : undefined
        }
      >
        <path
          d={painting.silhouette}
          fill="#ED8B98"
        />

        <g clipPath={`url(#${clipId})`}>
          {painting.layers.map((layer, index) => (
            <path
              key={`layer-${index}`}
              d={layer.d}
              fill={layer.fill}
              opacity={layer.opacity ?? 1}
            />
          ))}

          {painting.veins.map((vein, index) => (
            <path
              key={`vein-${index}`}
              d={vein.d}
              fill="none"
              stroke={vein.color}
              strokeWidth={vein.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={vein.opacity ?? 1}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

export function MarbleClouds({
  reducedMotion,
}: MarbleCloudsProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  const [clouds, setClouds] = useState<Cloud[]>(initialClouds);

  const [dimensions, setDimensions] = useState({
    width: 1440,
    height: 750,
  });


  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const updateDimensions = () => {
      const bounds = element.getBoundingClientRect();

      setDimensions({
        width: Math.max(1, bounds.width),
        height: Math.max(1, bounds.height),
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const isMobile = dimensions.width <= 767;

  function handleIteration(id: number) {
    setClouds((current) =>
      current.map((cloud) =>
        cloud.id === id ? nextCloud(cloud) : cloud,
      ),
    );
  }

  return (
    <div
      ref={containerRef}
      className="hero-marble"
      aria-hidden="true"
    >
      {clouds.map((cloud) => {
        const visibleWidth = Math.min(
          cloud.size,
          dimensions.width * (isMobile ? 0.56 : 0.34),
        );

        const cloudHeight = visibleWidth * (440 / 560);


        const startBelow = cloudHeight + 18;

        const totalRise =
          dimensions.height + startBelow + cloudHeight + 22;

        const horizontalDrift = Math.min(
          cloud.driftX,
          dimensions.width * (isMobile ? 0.38 : 0.34),
        );

        const styles = {
          '--cloud-x': `${cloud.x}%`,
          '--cloud-width': `${visibleWidth}px`,
          '--cloud-start-below': `${startBelow}px`,
          '--cloud-rise': `${-totalRise}px`,
          '--cloud-drift-x': `${horizontalDrift}px`,
          '--cloud-duration': `${cloud.duration}s`,
          '--cloud-delay': `${cloud.delay}s`,
          '--cloud-static-top':
            cloud.id === 0
              ? '52%'
              : cloud.id === 1
                ? '8%'
                : '75%',
        } as CSSProperties;

        return (
          <div
            key={cloud.id}
            className={`hero-marble__traveller hero-marble__traveller--${cloud.id}`}
            style={styles}
            onAnimationIteration={
              reducedMotion
                ? undefined
                : () => handleIteration(cloud.id)
            }
          >
            <MarbleArtwork
              id={cloud.id}
              variant={cloud.variant}
            />
          </div>
        );
      })}
    </div>
  );
}
