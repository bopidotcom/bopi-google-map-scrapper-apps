import AeroplaneIcon from '../../img/aeroplane-icon.png';

function ResultTable() {
    return (
      <div id="result-content" className={`select-none`}>
        <div id="result-table" className={`overflow-x`}>
          <table className={`table-auto`}>
            <thead>
                <tr>
                    <th className={`text-left px-2 py-2 w-1.5 rounded-tl bg-primary`}></th>
                    <th className={`text-left px-2 py-2 border-r border-light-gray bg-primary`}>Nama</th>
                    <th className={`text-left px-2 py-2 border-r border-light-gray bg-primary`}>Kategori</th>
                    <th className={`text-left px-2 py-2 border-r border-light-gray bg-primary`}>Alamat</th>
                    <th className={`text-left px-2 py-2 border-r border-light-gray bg-primary`}>No. HP</th>
                    {/* <th className={`text-left px-2 py-2 bg-primary`}>Website</th> */}
                    <th className={`text-left px-2 py-2 rounded-tr bg-primary`}>Rating</th>
                </tr>
            </thead>
            <tbody className={`text-black text-sm align-top bg-light`}>
                <tr>
                    <td className={`px-2 py-2 bg-gray border-t border-r border-light-gray w-5`}>1</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>The On Digital | Jasa Pembuatan Website Murah Medan | part of Meidea</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>Website Designer</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>Jln. Letjen Haryono MT Jl. Pusat Pasar No.186, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>081361462994</td>
                    {/* <td className={`table-cell`}></td> */}
                    <td className={`px-2 py-2 border-t border-light-gray`}>4.9(15)</td>
                </tr>
                <tr>
                    <td className={`px-2 py-2 bg-gray border-t border-r border-light-gray w-5`}>2</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>The On Digital | Jasa Pembuatan Website Murah Medan | part of Meidea</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>Website Designer</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>Jln. Letjen Haryono MT Jl. Pusat Pasar No.186, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212</td>
                    <td className={`px-2 py-2 border-t border-r border-light-gray`}>081361462994</td>
                    {/* <td className={`table-cell`}></td> */}
                    <td className={`px-2 py-2 border-t border-light-gray`}>4.9(15)</td>
                </tr>
            </tbody>
          </table>
          <div className={`w-full flex mt-3`}>
            <div>
                <button className={`bg-gray hover:opacity-90 disabled:opacity-50 px-3 py-1 rounded flex items-center justify-center`} type={`button`}>
                    Clear Results
                </button>
            </div>
            <div className={`ml-auto`}>
                <button className={`bg-primary font-bold hover:opacity-90 disabled:opacity-50 px-3 py-1 rounded flex items-center text-black justify-center`} type={`button`}>
                    <img src={AeroplaneIcon} width={17}/>&nbsp;Export Results
                </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default ResultTable;