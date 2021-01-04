import React from 'react'

const Ranking = (props) => {
    function compareMin(a, b) {
        if (a.time.min - b.time.min < 0) {
            return -1
        } else if (a.time.min - b.time.min === 0) {
            if (a.time.sek - b.time.sek < 0) {
                return -1
            } else if (a.time.sek - b.time.sek === 0) {
                if (a.time.ms - b.time.ms < 0) {
                    return -1
                } else if (a.time.ms - b.time.ms === 0) {
                    return 0
                } else if (a.time.ms - b.time.ms > 0) {
                    return 1
                }
            } else if (a.time.sek - b.time.sek > 0) {
                return 1
            }
        } else if (a.time.min - b.time.min > 0) {
            return 1
        }
    }
    let ranks = [...props.data]
    ranks = ranks.sort(compareMin)
    ranks = ranks.map((rank, index) =>
        <RankRow
            key={index}
            data={rank}
            index={index}>
        </RankRow>
    )

    return (
        <div className="ranking">
            <table className="tableRank">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imię</th>
                        <th>Czas</th>
                    </tr>
                </thead>
                <tbody>
                    {ranks}
                </tbody>
            </table>
        </div>
    )
}

const RankRow = (props) => {
    const { name, time } = props.data
    let { min, sek, ms } = time
    min = min < 10 ? '0' + min : min
    sek = sek < 10 ? '0' + sek : sek
    ms = ms < 10 ? '0' + ms : ms
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{name}</td>
            <td>{min + ':' + sek + ':' + ms}</td>
        </tr>
    )
}

export default Ranking;