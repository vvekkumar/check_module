import React,{ useRef } from "react";
import ReactToPrint from "react-to-print";
import print from '../images/print.png';

class ComponentToPrint extends React.PureComponent {
    
    render() {
      return (
        <div>
        <div  style={{width:'8.34cm',height:'4.31cm'}}>
            <img src={print} alt="print" />
        </div>
        </div>
      );
    }
  }


const PrintExample = () => {
    const componentRef = useRef();
    const pageStyle = `
  @page {
    size:203.2mm 93.13mm landscape !important;
    margin:0;
    -webkit-print-color-adjust: exact;
  }

  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
    }
  }
 

`;
    return(
        <div>
           <div>
           <a href="/camera"><i className="fa fa-arrow-left" aria-hidden="true"></i></a>
          </div>
            <ReactToPrint 
                trigger={() => <button style={{marginLeft:'50px'}}>Print this out!</button>}
                content={() => componentRef.current}
               pageStyle={pageStyle}
                
            />
               <ComponentToPrint ref={componentRef}  />
        </div>
    )
}

export default PrintExample