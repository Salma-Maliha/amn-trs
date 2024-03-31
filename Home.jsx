import  { useState, useEffect } from 'react';
import jsonData from './record.json';

const calculateValuethick = (fabricThickness, numberOfLayer) => {
  if (numberOfLayer && numberOfLayer <= 2) {
    return fabricThickness * 0.0393700787 * numberOfLayer;
  } else if (numberOfLayer) {
    return fabricThickness * 0.0393700787 * (1 + (numberOfLayer - 1) * 0.9);
  } else {
    return 0; // Or any default value you prefer if numberOfLayer is not provided
  }

};



const calculateStitchValue = (stitchType, valueThick, SPI) => {
  switch (stitchType) {
      case '301':
          return 1.8 + 2 * (valueThick * SPI);
      case '304':
          return (1.8 * SPI * (Math.sqrt((0.25 ** 2) + (1 / SPI) ** 2) + valueThick * 2));
      case '401':
          return 3.8 + 2 * (valueThick + 0.02) * SPI + 0.05 * SPI;
      case '406':
          return (6.8 + (2 * SPI * (2 * valueThick + 0.25)));
      case '407':
          return (8.5 + (2 * SPI * (3 * valueThick + 0.25)));
      case '408':
          return 8.5 + (4 * valueThick * SPI) + (0.5 * SPI);
      case '503':
          return (3 * (SPI * (0.25 + valueThick)) + 4.5);
      case '504':
          return 4 * (SPI * (0.25 + valueThick)) + 2;
      case '514':
          return 3 + 6 * valueThick * SPI + 4 * (0.25 * SPI);
      case '516':
          return calculateStitchValue('401', valueThick, SPI) + calculateStitchValue('504', valueThick, SPI);
      case '602':
          return 8.3 + (SPI * (5 * 0.25) + (4 * valueThick));
      case '605':
          return 10.3 + (2 * (SPI * ((2 * 0.25) + (3 * valueThick))));
      case '607':
          return 16 + (4.3 * SPI * ((0.25) + (2.2 * valueThick)));
      default:
          return '-';
  }
};



const Home = () => {
  const [formData, setFormData] = useState({
    stitchType: '',
    stitchDescription: '',
    seamLength: '',
    stitchRow: '',
    numberOfLayer: '',
    SPI: '',
    threadName_Type: '',
    fabricThickness: '',
    sewingAllowance: 0,
    stitchWidth: '',
    valueThick: '',
    // Add stitch width field
  });

 

  const [tableData, setTableData] = useState([]);
  const [calculationData, setCalculationData] = useState([]);

  
  useEffect(() => {
  
    document.title = 'TRS-Thread Requirement Solution';
  }, []);


  const calculateStitchWidth = (stitchType) => {
    switch (stitchType) {
      case '101':
      case '103':
      case '301':
      case '401':
      case '516':
      case 'Bartack':
      case 'Button_Hole':
      case 'Button_Sew':
        return 'null';
      case '304':
      case '406':
      case '407':
      case '408':
      case '503':
      case '504':
      case '514':
      case '602':
      case '605':
      case '607':
        return '1/4';
      default:
        return '';
    }
  };
  const calculateNeedleContribution = (stitchType) => {
    switch (stitchType) {
      case '101':
        return 0;
      case '103':
        return 1; // Modify this according to your logic
      case '301':
        return 0.5; // Modify this according to your logic
      // Add more cases for other stitch types as needed
      case '304':
        return 0.5;
      case '401':
      return .35;
    case '406':
      return 0.3;
    case '407':
      return .36;
    case '408':
      return .28;
    case '503':
      return .60;
    case '504':
      return .15;
    case '514':
      return .25;
    case '516':
      return .26;
    case '602':
      return 0.4;
    case '605':
      return 0.4;
    case '607':
      return 0.4;
    case 'Bartack':
      return 0.4;
    case 'Button_Hole':
    case 'Button_Sew':
      return .45;
    
      default:
        return 0; // Default value
    }
  };
  const calculateBT_LT_Contribution = (stitchType) => {
    switch (stitchType) {
      case '103':
        return 0;
      case '301':
      case '304':
        return 0.5;
      case '401':
        return 0.65;
      case '406':
        return 0.7;
      case '407':
        return 0.64;
      case '408':
        return 0.42;
      case '503':
        return 0.4;
      case '504':
        return 0.85;
      case '514':
        return 0.75;
      case '516':
        return 0.74;
      case '602':
        return 0.35;
      case '605':
        return 0.35;
      case '607':
        return 0.35;
      case 'Bartack':
        return 0.55;
      case 'Button_Hole':
        return 0.55;
      case 'Button_Sew':
        return 0.55;
      default:
        return 0; // Default value if stitch type doesn't match any case
    }
  };
  const calculateCoverContribution = (stitchType) => {
    switch (stitchType) {
      case '103':
        return 0;
      case '301':
        return 0;
      case '304':
        return 0;
      case '401':
        return 0;
      case '406':
        return 0;
      case '407':
        return 0;
      case '503':
        return 0;
      case '504':
        return 0;
      case '514':
        return 0;
      case '516':
        return 0;
      case '408':
        return 0.3;
      case '602':
        return 0.25;
      case '605':
        return 0.25;
      case '607':
        return 0.25;
        case 'Bartack':
        return 0;
      case 'Button_Hole':
        return 0;
      case 'Button_Sew':
        return 0;
      default:
        return 0; // Default value
    }
  };
  const calculateTotalContribution = (stitchType) => {
    switch (stitchType) {
      case '101':
        return 0; // Adjust this according to your logic
      case '103':
      case '301':
      case '304':
      case '401':
      case '406':
      case '407':
      case '408':
      case '503':
      case '504':
      case '514':
      case '516':
      case '602':
      case '605':
      case '607':
      case 'Bartack':
      case 'Button_Hole':
      case 'Button_Sew':
        return 1; // Total contribution is 1 for these stitch types
      default:
        return 0; // Default value if stitch type doesn't match any case
    }
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;

    let description = formData.stitchDescription; // Preserve current description
    let sewingAllowance = formData.sewingAllowance; // Preserve current sewing allowance
    let stitchWidth = formData.stitchWidth; // Preserve current stitch width
   

   


    if (name === 'stitchType') { // Only update description, sewing allowance, and stitch width if stitch type is changed
      switch (value) {
        case '101':
          description = 'Single thread chainstitch';
          break;
        case '103':
          description = 'Single thread blindstitch';
          break;
        case '301':
          description = 'Lockstitch';
          break;
        case '304':
          description = 'Lockstitch (zig-zag)';
          break;
        case '401':
          description = 'Double chainstitch';
          break;
        case '406':
          description = '2-needle cover chainstitch';
          break;
        case '407':
          description = '3-needle Bottom coverstitch';
          break;
        case '408':
          description = '2 times double chainstitch';
          break;
        case '503':
          description = '2-thread overlock stitch';
          break;
        case '504':
          description = '3-thread overlock stitch';
          break;
        case '514':
          description = '4-thread overlock stitch';
          break;
        case '516':
          description = 'Safety Stitch';
          break;
        case '602':
          description = 'double NDL coverstitch';
          break;
        case '605':
          description = '3-needle cover chainstitch';
          break;
        case '607':
          description = '4-needle cover chainstitch';
          break;
        case 'Bartack':
          description = 'Bartack';
          break;
        case 'Button_Hole':
          description = 'Button_Hole';
          break;
        case 'Button_Sew':
          description = 'Button Attach';
          break;
        default:
          description = '';
          break;
      }
      
     
      // Check if the stitch type is an integer value and set sewing allowance accordingly
      sewingAllowance = /^\d+$/.test(value) ? 2 : 0;

      // Calculate stitch width based on stitch type
      stitchWidth = calculateStitchWidth(value);
    }










    setFormData({ ...formData, [name]: value, stitchDescription: description, sewingAllowance, stitchWidth });
  };
 
  const handleSave = () => {
    if (
      formData.stitchType &&
      formData.stitchDescription &&
      formData.seamLength &&
      formData.stitchRow &&
      formData.numberOfLayer &&
      formData.SPI &&
      formData.threadName_Type &&
      formData.fabricThickness
    ) 
    {
      // const NeedleContribution = calculateNeedleContribution(formData.stitchType);
      // const bt_lt_contribution = calculateBT_LT_Contribution(formData.stitchType);
      // const CoverContribution = calculateCoverContribution(formData.stitchType); // Calculate Cover Contribution
      const valueThick = calculateValuethick(formData.fabricThickness, formData.numberOfLayer); // Calculate valueThick
     const stitchvalue = calculateStitchValue(formData.stitchType,formData['valueThick'],formData.SPI)
      const newData = {
        ...formData,
        sewingAllowance: /^\d+$/.test(formData.stitchType) ? 2 : 0,

      
        stitchWidth: calculateStitchWidth(formData.stitchType),
        'Needle Contribution': calculateNeedleContribution(formData.stitchType),
        'BT/LT Contribution': calculateBT_LT_Contribution(formData.stitchType),
        'Cover Contribution': calculateCoverContribution(formData.stitchType),
        'Total Contribution': calculateTotalContribution(formData.stitchType), // Add this line to calculate total contribution
        'valueThick': valueThick,
        'stitchvalue': stitchvalue,
        'Bartack': 19.80, // Add Bartack value here
        'Button_Hole': 39.00, // Add Button_Hole value here
        'Button_Sew': 20.00, // Add Button_Sew value here
        
      };
      
     // Assuming Seam length, No of stitch row, and calculateStitchValue are provided as variables



// Now you can use these functions to calculate values for each row in your table



      
      setTableData([...tableData, newData]);
      setFormData({
        stitchType: '',
        stitchDescription: '',
        seamLength: '',
        stitchRow: '',
        numberOfLayer: '',
        SPI: '',
        threadName_Type: '',
        fabricThickness: '',
        sewingAllowance: 0,
        stitchWidth: '',
      });
    } else {
      alert('Please fill up all the fields before saving.');
    }
  };
  
  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);

    const newCalculationData = [...calculationData];
    newCalculationData.splice(index, 1);
    setCalculationData(newCalculationData);
  };


  const handleGenerate = () => {
    const newData = tableData.map(data => ({
      threadName_Type: data.threadName_Type,
      'Net Consumption(m)': '',
      'Sewing Allowance(m)': '',
      'General Allowance(m)': '',
      'Total Consumption(m)': '',
      'Meter/Cone': '',
      'Price/Cone (USD)': '',
      'Thread costing/Garment (USD)': '',
      'Total Quantity (In Cone)': ''
    }));
    setCalculationData(newData);
  };

  return (
    
    <div className="p-4 bg-gradient-to-r bg-blue-200 rounded-md shadow">
      <form className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="stitchType" className="text-lg text-black">Stitch Type:</label>
          <select
            id="stitchType"
            name="stitchType"
            value={formData.stitchType}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md"
          >
            <option value="">-- Select Stitch Type --</option>
            <option value="101">101</option>
            <option value="103">103</option>
            <option value="301">301</option>
            <option value="304">304</option>
            <option value="401">401</option>
            <option value="406">406</option>
            <option value="407">407</option>
            <option value="408">408</option>
            <option value="503">503</option>
            <option value="504">504</option>
            <option value="514">514</option>
            <option value="516">516</option>
            <option value="602">602</option>
            <option value="605">605</option>
            <option value="607">607</option>
            <option value="Bartack">Bartack</option>
            <option value="Button_Hole">Button_Hole</option>
            <option value="Button_Sew ">Button_Sew</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="stitchDescription" className="text-lg text-black">Stitch Description:</label>
          <input
            type="text"
            id="stitchDescription"
            name="stitchDescription"
            value={formData.stitchDescription}
            readOnly
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="seamLength" className="text-lg text-black">Seam Length (Inch):</label>
          <input
            type="number"
            id="seamLength"
            name="seamLength"
            value={formData.seamLength}
            onChange={handleChange}
            min="0"
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stitchRow" className="text-lg text-black">Stitch Row:</label>
          <input
            type="number"
            id="stitchRow"
            name="stitchRow"
            value={formData.stitchRow}
            onChange={handleChange}
            min="0"
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="numberOfLayer" className="text-lg text-black">Number of Layers:</label>
          <input
            type="number"
            id="numberOfLayer"
            name="numberOfLayer"
            value={formData.numberOfLayer}
            onChange={handleChange}
            min="0"
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="SPI" className="text-lg text-black">SPI (Stitches Per Inch):</label>
          <input
            type="number"
            id="SPI"
            name="SPI"
            value={formData.SPI}
            onChange={handleChange}
            min="0"
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fabricThickness" className="text-lg text-black">Thickness of fabric (mm):</label>
          <input
            type="number"
            id="fabricThickness"
            name="fabricThickness"
            value={formData.fabricThickness}
            onChange={handleChange}
            step="any"
            min="0"
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
        <label htmlFor="threadName_Type" className="text-lg text-black">Thread Name/Thread Type:</label>
          <select
            id="threadName_Type"
            name="threadName_Type"
            value={formData.threadName_Type}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md"
          >
            <option value="">-- Select Thread Name/Type --</option>
            {jsonData.map((item, index) => (
              <option key={index} value={item.Article}>{item.Article+"("+item.Length+")"}</option>
            ))}
          </select>
          </div>
        <div className="flex flex-col">
          <label htmlFor="stitchWidth" className="text-lg text-black">Stitch Width:</label>
          <input
            type="text"
            id="stitchWidth"
            name="stitchWidth"
            value={formData.stitchWidth}
            readOnly
            className="mt-1 p-2 border rounded-md"
          />
          </div>
     <div className="flex flex-col">
  <label htmlFor="valueThick" className="text-lg text-black">Value Thick:</label>
  <input
    type="text"
    id="valuethick"
    name="valuethick"
    value={calculateValuethick(formData.fabricThickness, formData.numberOfLayer)} // Pass numberOfLayer as an argument
    readOnly
    className="mt-1 p-2 border rounded-md"
  />
</div>
<div className="flex flex-col">
  <label htmlFor="stitchvalue" className="text-lg text-black">stitch value:</label>
  <input
    type="text"
    id="stitchvalue"
    name="stitchvalue"
    value={calculateStitchValue(formData.stitchType,formData['valueThick'], formData.SPI)} // Pass numberOfLayer as an argument
    readOnly
    className="mt-1 p-2 border rounded-md"
  />
</div>
<div className="flex flex-col">
  <label htmlFor="needleContribution" className="text-lg text-black">Needle Contribution:</label>
  <input
    type="text"
    id="needleContribution"
    name="needleContribution"
    value={calculateNeedleContribution(formData.stitchType)}
    readOnly
    className="mt-1 p-2 border rounded-md"
  />
</div>

<div className="flex flex-col">
  <label htmlFor="btLtContribution" className="text-lg text-black">BT_LT Contribution:</label>
  <input
    type="text"
    id="btLtContribution"
    name="btLtContribution"
    value={calculateBT_LT_Contribution(formData.stitchType)}
    readOnly
    className="mt-1 p-2 border rounded-md"
  />
</div>

<div className="flex flex-col">
  <label htmlFor="coverContribution" className="text-lg text-black">Cover Contribution:</label>
  <input
    type="text"
    id="coverContribution"
    name="coverContribution"
    value={calculateCoverContribution(formData.stitchType)}
    readOnly
    className="mt-1 p-2 border rounded-md"
  />
</div>

<div className="flex flex-col">
  <label htmlFor="totalContribution" className="text-lg text-black">Total Contribution:</label>
  <input
    type="text"
    id="totalContribution"
    name="totalContribution"
    value={calculateTotalContribution(formData.stitchType)}
    readOnly
    className="mt-1 p-2 border rounded-md"
  />
</div>




      </form>
      <button
        className='w-full bg-white hover:bg-blue-500 py-2 my-4 rounded shadow'
        onClick={handleSave}
      >Save
      </button>
      <div className="overflow-x-auto"> {/* Add overflow-x-auto class to enable horizontal scrolling */}
        <div>
          <h2 className="text-black-500 text-lg font-bold mb-2">Table</h2>
          <table className="table-auto min-w-full"> {/* Add min-w-full class to make the table full width */}
            <thead>
              <tr>

              <th className="px-4 py-2">Stitch Type</th>
              <th className="px-4 py-2">Stitch Description</th>
              <th className="px-4 py-2">Seam Length</th>
              <th className="px-4 py-2">Stitch Row</th>
              <th className="px-4 py-2">Number of Layers</th>
              <th className="px-4 py-2">SPI</th>
              <th className="px-4 py-2">Thread Name/Type</th>
              <th className="px-4 py-2">Thickness Of Fabrics</th>
              <th className="px-4 py-2">Sewing Allowance (inch)</th>
              <th className="px-4 py-2">Stitch Width</th>
              <th className="px-4 py-2">Needle Contribution</th> {/* Include Needle Contribution column */}
              <th className="px-4 py-2">BT_LT_Contribution</th> {/* Include BT_LT_Contribution column */}
              <th className="px-4 py-2">Cover Contribution</th> {/* Include Cover_Contribution column */}
              <th className="px-4 py-2">Total Contribution</th> {/* Include Total Contribution column */}
              <th className="px-4 py-2">value thick</th> {/* Add TKey header to the table */}
              <th className="px-4 py-2">301 Value</th>
              <th className="px-4 py-2">304 Value</th>
              <th className="px-4 py-2">401 Value</th>
              <th className="px-4 py-2">406 Value</th>
              <th className="px-4 py-2">407 Value</th>
              <th className="px-4 py-2">408 Value</th>
<              th className="px-4 py-2">503 Value</th>
              <th className="px-4 py-2">504 Value</th>
              <th className="px-4 py-2">514 Value</th>
              <th className="px-4 py-2">516 Value</th>
              <th className="px-4 py-2">602 Value</th>
              <th className="px-4 py-2">605 Value</th>
               <th className="px-4 py-2">607 Value</th>
              <th className="px-4 py-2">array fixed value</th>
              <th className="px-4 py-2">Bartack</th>
              <th className="px-4 py-2">Button_Hole</th>
              <th className="px-4 py-2">Button_Sew</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{data.stitchType}</td>
                <td className="border px-4 py-2">{data.stitchDescription}</td>
                <td className="border px-4 py-2">{data.seamLength}</td>
                <td className="border px-4 py-2">{data.stitchRow}</td>
                <td className="border px-4 py-2">{data.numberOfLayer}</td>
              <td className="border px-4 py-2">{data.SPI}</td>
              <td className="border px-4 py-2">{data.threadName_Type}</td>
              <td className="border px-4 py-2">{data.fabricThickness}</td>
              <td className="border px-4 py-2">{data.sewingAllowance}</td>
              <td className="border px-4 py-2">{data.stitchWidth}</td>
              <td className="border px-4 py-2">{data['Needle Contribution']}</td> {/* Include Needle Contribution data */}
              <td className="border px-4 py-2">{data['BT/LT Contribution']}</td> {/* Remove the extra space at the end */}
              <td className="border px-4 py-2">{data['Cover Contribution']}</td>
              <td className="border px-4 py-2">{data['Total Contribution']}</td>
              
              <td className="border px-4 py-2">
      {data.numberOfLayer ? (
        data.numberOfLayer <= 2 ? (
          data.fabricThickness * 0.0393700787 * data.numberOfLayer
        ) : (
          data.fabricThickness * 0.0393700787 * (1 + (data.numberOfLayer - 1) * 0.9)
        )
      ) : (
        '-' // If numberOfLayer is not provided, display '-'
      )}
    </td>
    <td className="border px-4 py-2">
    {data.stitchType === '301' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '304' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '401' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '406' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '407' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '408' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '503' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '504' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '514' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '516' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '602' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '605' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
<td className="border px-4 py-2">
    {data.stitchType === '607' ? (
        calculateStitchValue(data.stitchType, data['valueThick'], data.SPI)
    ) : (
        '-'
    )}
</td>
    <td className="border px-4 py-2">4.40</td>
    <td className="border px-4 py-2">{data['Bartack']}</td>
    <td className="border px-4 py-2">{data['Button_Hole']}</td>
<td className="border px-4 py-2">{data['Button_Sew']}</td>





<td className="border px-4 py-2">
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    <button
      className='w-full bg-white hover:bg-blue-500 py-2 my-4 rounded shadow'
      onClick={handleGenerate}
    >
      Generate
    </button>
    {calculationData.length > 0 && (
      <div>
        <h2 className="text-black text-lg font-bold mb-2">Generated Table</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Thread Name/Type</th>
              <th className="px-4 py-2">Net Consumption(m)</th>
              <th className="px-4 py-2">Sewing Allowance(m)</th>
              <th className="px-4 py-2">General Allowance(m)</th>
              <th className="px-4 py-2">Total Consumption(m)</th>
              <th className="px-4 py-2">Meter/Cone</th>
              <th className="px-4 py-2">Price/C one (USD)</th>
              <th className="px-4 py-2">Thread costing/Garment (USD)</th>
              <th className="px-4 py-2">Total Quantity (In Cone)</th>
            </tr>
          </thead>
          <tbody>
            {calculationData.map((data, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{data.threadName_Type}</td>
                <td className="border px-4 py-2">{data['Net Consumption(m)']}</td>
                
                <td className="border px-4 py-2">{data['Sewing Allowance(m)']}</td>
                <td className="border px-4 py-2">{data['General Allowance(m)']}</td>
                <td className="border px-4 py-2">{data['Total Consumption(m)']}</td>
                <td className="border px-4 py-2">{data['Meter/Cone']}</td>
                <td className="border px-4 py-2">{data['Price/Cone (USD)']}</td>
                <td className="border px-4 py-2">{data['Thread costing/Garment (USD)']}</td>
                <td className="border px-4 py-2">{data['Total Quantity (In Cone)']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
            }
          

export default Home;