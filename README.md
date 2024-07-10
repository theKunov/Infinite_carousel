# Infinite Carousel Component

A React component that implements an infinite scrolling carousel fetching images from an API, built with TypeScript and styled-components.

## Features

- **Infinite Scroll:** The carousel scrolls infinitely in both directions.
- **API Integration:** Fetches images from Pixabay API.
- **Lazy Loading:** Uses IntersectionObserver to lazy load images.
- **Responsive:** Adjusts carousel width based on browser width.

## Components

### `Carousel`

The main carousel component that manages the scrolling behavior and fetches image data.

#### Props

- `length`: Number of images to fetch.
- `imageWidth` (optional): Width of each image (default: 200px).
- `imageHeight` (optional): Height of each image (default: 200px).

#### Usage

```tsx
import React from 'react';
import Carousel from './Carousel';

const App: React.FC = () => {
  return (
    <div>
      <Carousel length={10} imageWidth={250} imageHeight={250} />
    </div>
  );
};

export default App;
```

### `useFetchImageList`

Custom hook to fetch image URLs from Pixabay API.

#### Props

- `imageWidth`: Width of each image.
- `imageHeight` (optional): Height of each image (default: same as width).
- `length`: Number of images to fetch.

### `Item`

Component to display each image fetched from the API.

#### Props

- `imageUrl`: URL of the image to display.

## Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

## Dependencies

- `react`: "^17.0.2"
- `react-dom`: "^17.0.2"
- `styled-components`: "^5.3.0"

## Development

To contribute to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [Borislav Kunov](mailto:borislav.r.kunov@gmail.com).