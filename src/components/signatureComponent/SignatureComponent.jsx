import React, {
  // useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import useIsMobile from '../../hooks/useIsMobile';

const SignatureComponent = ({ onGenerateSign }, ref) => {
  //   const [sign, setSign] = useState();
  // const [url, setURL] = useState();
  const signatureRef = useRef();
  const isMobile = useIsMobile();

  useImperativeHandle(ref, () => ({
    generateSign: () => {
      const generatedURL = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      // setURL(generatedURL);
      onGenerateSign(generatedURL);
    },
    clear: () => {
      signatureRef.current.clear();
    },
  }));

  return (
    <>
      <div
        style={{
          border: 'solid black 1px',
          width: isMobile ? 300 : 400,
          maxWidth: '400px',
          margin: '10px auto',
        }}
      >
        <SignatureCanvas
          canvasProps={{
            width: isMobile ? 300 : 399,
            height: 150,
            className: 'sigCanvas',
          }}
          ref={signatureRef}
        />
      </div>

      <button
        className='text-sm border border-[#EA4336] rounded-md px-3 py-2 hover:bg-[#EA4336] hover:text-white'
        onClick={() => ref.current.clear()}
      >
        Clear
      </button>
    </>
  );
};

export default forwardRef(SignatureComponent);
