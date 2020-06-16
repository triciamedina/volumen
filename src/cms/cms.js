import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import LibraryPostPreview from './preview-templates/LibraryPostPreview'
// import StylePostPreview from './preview-templates/StylePostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
// CMS.registerPreviewTemplate('styling', StylePostPreview)
CMS.registerPreviewTemplate('library', LibraryPostPreview)
// CMS.registerPreviewStyle("../components/tailwind.css");


