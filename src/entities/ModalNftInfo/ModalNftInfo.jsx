import { Icon24CrownCircleFillVkDating } from '@vkontakte/icons';
import {
  CellButton,
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  Panel,
  PanelHeaderClose,
  PanelHeaderSubmit,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
  View,
} from '@vkontakte/vkui';
import React, { useState } from 'react';
import { getFormat } from '../../shared/utils/format';
import { getTokenPathByOrderId } from './api/index';

const MODAL_PAGE_FULLSCREEN = 'fullscreen';

export function ModalNftInfo({ orderId, vkId }) {
  const { sizeX } = useAdaptivityConditionalRender();
  const [activeModal, setActiveModal] = useState(null);
  const [modalHistory, setModalHistory] = useState([]);
  const [tokens, setTokens] = useState([]);

  const changeActiveModal = async (activeModal) => {
    activeModal = activeModal || null;
    let localModalHistory = modalHistory ? [...modalHistory] : [];

    if (activeModal === null) {
      localModalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
    } else {
      localModalHistory.push(activeModal);
    }

    setActiveModal(activeModal);
    setModalHistory(localModalHistory);

    const data = (await getTokenPathByOrderId(vkId, orderId)).data;
    setTokens(data.map((item) => ({
      name: item.name,
      date: getFormat(item.metadata.date),
      token: item.address,
      state: item.metadata.state,
      type: item.metadata.type,
    })));
  };

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2]);
  };

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={modalBack}>
      <ModalPage
        id={MODAL_PAGE_FULLSCREEN}
        onClose={modalBack}
        settlingHeight={100}
        header={
          <ModalPageHeader
            before={sizeX.compact && <PanelHeaderClose className={sizeX.compact.className} onClick={modalBack} />}
            after={<PanelHeaderSubmit onClick={modalBack} />}
          >
            Список Транзакций NFT
          </ModalPageHeader>
        }
      >
        <Group>
          {tokens.map((o, i) => (
            <div
              key={i}
              style={{
                padding: '10px',
                color: 'white',
                fontWeight: '600',
                margin: '10px',
                borderRadius: '15px',
                background: 'linear-gradient(60deg, #0092ff, #dd00ff)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
                <div>{o.name}</div>
                <div>{o.date}</div>
              </div>

              <div
                style={{
                  fontSize: '14px',
                  margin: '5px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {o.token}
              </div>
              <div style={{ fontSize: '14px', margin: '5px' }}>Статус: {o.state}</div>
              <div style={{ fontSize: '14px', margin: '5px' }}>Тип: {o.type}</div>
            </div>
          ))}
        </Group>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal}>
      <SplitCol>
        <View activePanel='modals'>
          <Panel id='modals'>
            <CellButton
              onClick={() => changeActiveModal(MODAL_PAGE_FULLSCREEN)}
              before={<Icon24CrownCircleFillVkDating style={{ paddingRight: '12px', marginLeft: '-4px' }} />}
            >
            </CellButton>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}
