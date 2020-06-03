import React from 'react';
interface InfoBoxProps {
    name: string;
    value: number;
    prev: number;
    pos: boolean;
}
export const InfoBox: React.FunctionComponent<InfoBoxProps> = ({ name, value, prev, pos }) => {
    const className = `info-box ${pos ? 'pos' : 'neg'}`
    return (
        <div className={className}>
            <div className="title">{ name }</div>
            <div className="value">${ value }</div>
            <div className="bottom">
                {
                    !pos ?
                    (
                        <div className="arrow neg">&#8595;</div>
                    ) : 
                    (
                        <div className="arrow pos">&#8593;</div>
                    )
                }
                <div className="prev-value">
                    { prev }
                </div>
            </div>
        </div>
    )
};
