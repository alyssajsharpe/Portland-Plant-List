'use client';

import { useEffect, useRef } from 'react';

export default function WebViewer() {
  const viewer = useRef<HTMLDivElement>(null);
  const initializing = useRef(false);

  useEffect(() => {
    if (!viewer.current || initializing.current) {
      return;
    }

    initializing.current = true;

    import('@pdftron/webviewer').then((module) => {
      if (!viewer.current) return;

      const WebViewer = module.default;

      WebViewer(
        {
          path: '/lib/webviewer',
          licenseKey: 'demo:1787935525684:639e8898030000000081e4133cf4e644c90c3f72cf777969717e200414',
          initialDoc:
            '/lib/webviewer/CertificationDeterminationForm.pdf',
        },
        viewer.current
      ).then((instance) => {
        const { documentViewer } = instance.Core;
      });
    });
  }, []);

  return (
    <div
      className="webviewer"
      ref={viewer}
      style={{
        width: '100%',
        height: '100vh',
        margin: '0 auto',
      }}
    />
  );
}