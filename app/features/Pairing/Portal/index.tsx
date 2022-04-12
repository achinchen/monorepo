import { usePairContext } from '../context';
import { HeaderPortal } from '~/components/Layout/header';
import IconButton from '~/components/IconButton';
import { Fragment } from 'react';

export default function Portal() {
  const { showPanel, setShowPanel } = usePairContext();
  const state = showPanel ? '篩選' : '花色';

  const onOpenPanel = () => setShowPanel(true);
  const onClosePanel = () => setShowPanel(false);

  const onClose = () => {
    return;
  };

  return (
    <HeaderPortal {...(!showPanel && { bg: 'transparent' })}>
      <Fragment>
        {showPanel ? (
          <IconButton
            pr="4"
            py="4"
            iconAttributifyOptions={{ w: 5 }}
            icon="ArrowLeft"
            onClick={onClosePanel}
            bg="transparent"
          />
        ) : (
          <IconButton
            pr="4"
            py="4"
            iconAttributifyOptions={{ w: 6 }}
            icon="Undo"
            onClick={onClose}
            bg="transparent"
          />
        )}
        <div m="auto">{state}</div>
        {!showPanel && (
          <IconButton
            pl="4"
            py="4"
            bg="transparent"
            iconAttributifyOptions={{ w: 6 }}
            icon="Filter"
            onClick={onOpenPanel}
          />
        )}
      </Fragment>
    </HeaderPortal>
  );
}
