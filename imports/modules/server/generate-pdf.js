import ReactDOMServer from 'react-dom/server';
import pdf from 'html-pdf';
import fs from 'fs';

let module;

const getBase64String = (path) => {
  try {
    const file = fs.readFileSync(path);
    return new Buffer(file).toString('base64');
  } catch (exception) {
    module.reject(exception);
  }
};

const generatePDF = (html, fileName) => {
  try {
    pdf.create(html, {
      format: 'letter',
      border: { top: '0.6in', right: '0.6in', bottom: '0.6in', left: '0.6in' },
    }).toFile(`./tmp/${fileName}`, (error, response) => {
      if (error) {
        module.reject(error);
      } else {
        module.resolve({ fileName, base64: getBase64String(response.filename) });
        fs.unlink(response.filename);
      }
    });
  } catch (exception) {
    module.reject(exception);
  }
};

const getComponentAsHTML = (component, props) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(component(props));
  } catch (exception) {
    module.reject(exception);
  }
};

const handler = ({ component, props, fileName }, promise) => {
  module = promise;
  const html = getComponentAsHTML(component, props);
  if (html && fileName) generatePDF(html, fileName);
};

export const generateComponentAsPDF = (options) => {
  return new Promise((resolve, reject) => {
    return handler(options, { resolve, reject });
  });
};
