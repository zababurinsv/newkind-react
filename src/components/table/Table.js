import React, {useEffect, useState, useRef} from "react";
import { config } from '../../config/index'
import * as libCrypto from '@waves/ts-lib-crypto'
import isEmpty from '../../utils/isEmpty/isEmpty.mjs'
import template from '../../template/index.mjs'

function Table(props) {
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const modalSectionRef = useRef(null);
  const [data, setData]=useState([])

  useEffect(() => {
    window.sessionStorage.clear();
    config.table.body.forEach(item => {
      const id = libCrypto.privateKey(libCrypto.randomSeed())
      window.sessionStorage.setItem(id, JSON.stringify(item));
    })
    setData(Object.values(window.sessionStorage).map(item => JSON.parse(item)))
  },[]);

  const showModal = (events) => {
    modalRef.current.showModal();
  }

  const cleanModal = () => {
    let inputs = modalSectionRef.current.querySelectorAll('input')
    for(let item of inputs) {
      item.value = ''
    }
  }

  const closeModal = (events) => {
    cleanModal()
    modalRef.current.close();
  }

  const saveItem = (events) => {
    let inputs = modalSectionRef.current.querySelectorAll('input')
    const id = libCrypto.privateKey(libCrypto.randomSeed())
    let newData = {}
    for(let item of inputs) {
      newData[item.name] = item.value
    }
    window.sessionStorage.setItem(id, JSON.stringify(newData));
    cleanModal()
    modalRef.current.close();
    setData(Object.values(window.sessionStorage).map(item => JSON.parse(item)))
  }

  const searchClick = (events) => {
    const inputs = inputRef.current.querySelectorAll('input')
    let items = Object.values(window.sessionStorage).map(item => JSON.parse(item))
    for(let input of inputs) {
      if(!isEmpty(input.value)) {
        items = items.filter(item => item[input.name].toString().indexOf(input.value.toString()) !== -1)
      }
    }
    setData(items)
  }

  const clickEffect = (item) => {
    const activeClass = 'auction-data__active'
    item.classList.add(activeClass)
    setTimeout(() => {
      item.classList.remove(activeClass)
    },140)
  }

  const tableVisual = (even, odd) => {
    const items = bodyRef.current.querySelectorAll('.auction-data__table_body_tr')
    for(let i = 0 ; i < items.length; i++ ) {
      if(i % 2) {
        for(let item of items[i].querySelectorAll('.auction-data__table_body_td')) {
          item.style.background = even
        }
      } else {
        for(let item of items[i].querySelectorAll('.auction-data__table_body_td')) {
          item.style.background = odd
        }
      }
    }
  }

  const eventsAside = async (events) => {
    switch (events.currentTarget.name) {
      case 'even':
        tableVisual('#859d85', 'white')
        break
      case 'odd':
        tableVisual('white', '#859d85')
        break
      case 'all':
        tableVisual('white', 'white')
        break
      default:
        console.log('default router', events.currentTarget.name)
        break
    }
  }

  const eventsClick = async (events) => {
    let content = events.target.classList
    if(!content.contains('auction-data__table_body_tr')
      && !content.contains('auction-data__table_body')
      && !content.contains('auction-data__table')
      && !content.contains('auction-data')) {
      const item = (events.target.classList.contains('auction-data__table_body_td'))
        ? events.target
        : events.target.parentNode
      clickEffect(item)
      await navigator.clipboard.writeText(item.querySelector('span').textContent)
    }
  }

  return (
    <div className="auction-data">
      <dialog ref={modalRef}>
        <div method="auction-data__dialog">
          <section
            ref={modalSectionRef}
            className="auction-data__dialog_section"
          >
            <label htmlFor="modal_assetId">assetId</label>
            <input name="assetId" id="modal_assetId" type="text"/>

            <label htmlFor="modal_timestamp">timestamp</label>
            <input name="timestamp" id="modal_timestamp" type="text"/>

            <label htmlFor="modal_description">description</label>
            <input name="description" id="modal_description" type="text"/>

            <label htmlFor="modal_name">name</label>
            <input name="name" id="modal_name" type="text"/>

            <label htmlFor="modal_proofs">proofs</label>
            <input name="proofs" id="modal_proofs" type="text"/>

            <label htmlFor="modal_sender">sender</label>
            <input name="sender" id="modal_sender" type="text"/>
          </section>
          <menu
            className="auction-data__dialog_menu"
          >
            <button
              onClick={closeModal}
              className="auction-data__dialog_menu_close"
              type="reset"
            >
              Cancel
            </button>
            <button
              onClick={saveItem}
              className="auction-data__dialog_menu_save"
              type="button"
            >
              Save
            </button>
          </menu>
        </div>
      </dialog>
      <div className="auction-data__header_date">{new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"})}</div>
      <input
        onClick={showModal}
        type="button"
        value="Create New"
        className={'auction-data__header_button'}
      />
      <div className="auction-data__nav">
        {config.aside.button.map((item, index) => (
          <React.Fragment key={index}>
            <input
              type="button"
              value={item}
              name={item.split(' ')[0]}
              className={`auction-data__aside_button`}
              onClick={eventsAside}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="auction-data__table">
        <div className="auction-data__table_header">
          {config.table.header.map((item, index) => (
            <React.Fragment key={index}>
              <div className="auction-data__table_header_td">{item}</div>
            </React.Fragment>
          ))}
        </div>
        <div className="auction-data__table_body" ref={bodyRef}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <div className="auction-data__table_body_tr">
                {Object.keys(item).map((key, index) => (
                  <React.Fragment key={index}>
                    <div className={`auction-data__table_body_td ${key}`}>
                      <span
                        onClick={eventsClick}>{item[key]}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div ref={inputRef} className="auction-data__table_footer">
          {config.table.footer.map((item, index) => (
            <React.Fragment key={index}>
              <input
                onChange={searchClick}
                className="auction-data__table_footer_td"
                name={item}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Table }