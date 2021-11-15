import React from "react";

function Statistics(props) {
    return(
        <div className={"statistic"}>
            <div className={"statistic__header"}>
                {Object.keys(props.header).map(function(item, i) {
                    return <div className={`statistic__header-item`} key= { i }>{ props.header[item] }</div>;
                })}
            </div>
            <div className={"statistic__body"}>
                {
                    (props.body)
                        ? (Object.keys(props.body).map(function(item, i) {
                            return <div className={`statistic__body-item`} key= { i }>{ props.body[item] }</div>;
                        }))
                        : ''
                }
            </div>
        </div>
    );
}

export { Statistics }