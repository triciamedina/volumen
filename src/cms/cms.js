import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import LibraryPostPreview from './preview-templates/LibraryPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import '../components/tailwind.css';

// CMS.registerPreviewStyle('../components/tailwind.css')
CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('library', LibraryPostPreview)


