// routes - sequence.js
const router        = require('express').Router()
const pluralize     = require('pluralize')
const db            = require('../db/models/218')
const asyncHandler  = require('../middleware/asyncHandler')

/** index */
router.get('/', asyncHandler(async(_, res) => {  
    const items     = await db.Item.findAll()
    const status    = ['Pending', 'Completed']
    const headers   = [
        { title: 'Number', key: 'itemNumber', width: '122.5px' },
        { title: 'Description', key: 'description', },
        { title: 'Purchasing', align: 'center', key: 'purchasing', width: '1px', statusHeader: true, sortable: false },
        { title: 'Marketing', align: 'center', key: 'marketing', width: '1px', statusHeader: true, sortable: false },
        { title: 'Finance', align: 'center', key: 'finance', width: '1px', statusHeader: true, sortable: false },
        { title: 'Inventory', align: 'center', key: 'inventory', width: '1px', statusHeader: true, sortable: false },
        { title: 'Admin', align: 'center', key: 'admin', width: '1px', statusHeader: true, sortable: false },
        { title: 'Created At', key: 'createdAt', },
        { title: 'Updated At', key: 'updatedAt',  },
        { title: 'Log', key: 'log', width: '1px' },
        { title: '', key: 'actions', width: '1px' },

    ] 
    res.send({ items, headers, status })
}))

router.get('/jjmm', asyncHandler(async(req, res) => {   
    const fields = await db.ItemMaster.findAll()
    res.json({ fields, })
}))

router.get('/create', asyncHandler(async(req, res) => { 
    const itemNumberMaxLength = req.user?.admin ? 15 : 6
    const itemNumberRules = ['required', 'maxLength', ]
    
    if (!req.user?.admin) {
        itemNumberRules.push('numeric')
    }

    const fields = [ 
        { key: 'itemNumber', label: 'Item Number', rules: itemNumberRules, maxLength: itemNumberMaxLength, bind: { style: 'width: 65%' }, },
        { key: 'description', label: 'Description', rules: ['required', 'maxLength', ], maxLength: 40, bind: { class: 'my-3' } },
        { key: 'fullDescription', label: 'Full Description', rules: ['required', 'maxLength', ], maxLength: 60, }
    ]

    res.send({ fields, })
}))

router.get('/check-availability/:itemNumber', asyncHandler(async(req, res) => {   
    res.json({ available: true, })
}))



/** search */
router.post('/search', asyncHandler(async (req, res) => {
    const { customerNumbers, salesDepartments, businessAreas } = req.body
    const routeSequence = await db.RouteSequence.findAll({
        replacements: { businessAreas },
        include: ['customer', 'salesperson',],
        where: {
            [db.Sequelize.Op.or]: [{ 
                customerNumber: customerNumbers 
            }, { 
                salesDepartment: salesDepartments
            }, {
                '$Salesperson.business$': businessAreas
            }]
        },
    })

    res.json({ routeSequence })
}))

/** create resource */
router.post('/', asyncHandler(async (req, res) => {
    const item      = req.body.item
    await db.Item.create(item)
    const data      = [{
            "field": "PRMD",
            "description": "Process flag",
            "type": "A",
            "length": "4",
            "defaultValue": "*AUT",
            "comments": "Solo necesario para la tabla de interface",
            "required": true,
            "panel": "",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "1"
        }, {
            "field": "E0PA",
            "description": "Partner",
            "type": "A",
            "length": "2",
            "defaultValue": "WM",
            "comments": "Solo necesario para la tabla de interface",
            "required": true,
            "panel": "",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "1"
        }, {
            "field": "E065",
            "description": "Message type",
            "type": "A",
            "length": "3",
            "defaultValue": "BOD",
            "comments": "Solo necesario para la tabla de interface",
            "required": true,
            "panel": "",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "1"
        }, {
            "field": "IFIN",
            "description": "Interface item number",
            "type": "A",
            "length": "15",
            "defaultValue": "Same as ITNO",
            "comments": "Solo necesario para la tabla de interface. Debe ser el mismo número del Item Number.",
            "required": true,
            "panel": "",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "1"
        }, {
            "field": "ITNO",
            "description": "Item number",
            "type": "A",
            "length": "15",
            "defaultValue": "User Input",
            "comments": "Item number debe ser único. En la mayoría de los casos, no se reusan los ya existentes en AS400.",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "ITDS (30)",
            "description": "",
            "type": "A",
            "length": "30",
            "defaultValue": "=LEFT(ITDS,30)",
            "comments": "Descripción del producto en Proper Case. No caracteres especiales. Interface table solo acepta 30 char max.",
            "required": true,
            "panel": "",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "1"
        }, {
            "field": "ITDS",
            "description": "Name",
            "type": "A",
            "length": "40",
            "defaultValue": "User Input",
            "comments": "Descripción del producto en Proper Case. No caracteres especiales.",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MMS200 / UpdItmBasic",
            "departmentId": "3"
        }, {
            "field": "FUDS",
            "description": "Description 2",
            "type": "A",
            "length": "60",
            "defaultValue": "User Input",
            "comments": "Descripción del producto en Proper Case. No caracteres especiales.",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "STAT",
            "description": "Status",
            "type": "A",
            "length": "2",
            "defaultValue": "05",
            "comments": "No se a donde hace referencia este campo. Lista de opciones en MMS001. ",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "1"
        }, {
            "field": "ITTY",
            "description": "Item type",
            "type": "A",
            "length": "3",
            "defaultValue": "Drop down list",
            "comments": "Este campo hace referencia a las opciones en la tabla MITTTY (CRS040).",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "ITGR",
            "description": "Item group",
            "type": "A",
            "length": "3",
            "defaultValue": "Drop down list",
            "comments": "Referencia en CSYTAB (CRS025.)",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "ITCL",
            "description": "Product group",
            "type": "A",
            "length": "3",
            "defaultValue": "Drop down list",
            "comments": "Referencia en CSYTAB (CRS035.)",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "PRGP",
            "description": "Procurement group",
            "type": "A",
            "length": "3",
            "defaultValue": "Drop down list",
            "comments": "Referencia en CSYTAB (CRS037.)",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "UNMS",
            "description": "Basic unit of measure",
            "type": "A",
            "length": "2",
            "defaultValue": "Drop down list",
            "comments": "Referencia en CSYTAB (CRS050.)",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "HIE1",
            "description": "Hierachy level 1",
            "type": "A",
            "length": "1",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS021.)",
            "required": true,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "HIE2",
            "description": "Hierachy level 2",
            "type": "A",
            "length": "4",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS021.)",
            "required": true,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "HIE3",
            "description": "Hierachy level 3",
            "type": "A",
            "length": "8",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS021.)",
            "required": true,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "HIE4",
            "description": "Hierachy level 4",
            "type": "A",
            "length": "12",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS021.)",
            "required": false,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "HIE5",
            "description": "Hierachy level 5",
            "type": "A",
            "length": "15",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS021.)",
            "required": false,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "GRP1",
            "description": "Search group 1",
            "type": "A",
            "length": "1",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS022.)",
            "required": true,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "GRP2",
            "description": "Search group 2",
            "type": "A",
            "length": "3",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS022.)",
            "required": true,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "GRP3",
            "description": "Search group 3",
            "type": "A",
            "length": "4",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS022.)",
            "required": true,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "GRP4",
            "description": "Search group 4",
            "type": "A",
            "length": "4",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS022.)",
            "required": false,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "GRP5",
            "description": "Search group 5",
            "type": "A",
            "length": "3",
            "defaultValue": "Drop down list",
            "comments": "Referencia en MITHRY (MMS022.)",
            "required": false,
            "panel": "Hierarchy Level",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "INDI",
            "description": "Lot control method",
            "type": "N",
            "length": "1",
            "defaultValue": "Drop down list",
            "comments": "No se a donde hace referencia este campo. Lista de opciones en MMS001. ",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "BACD",
            "description": "Lot numbering method",
            "type": "N",
            "length": "1",
            "defaultValue": "0",
            "comments": "No se a donde hace referencia este campo. Lista de opciones en MMS001. ",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "EXPD",
            "description": "Expiration date method",
            "type": "N",
            "length": "1",
            "defaultValue": "Drop down list",
            "comments": "No se a donde hace referencia este campo. Lista de opciones en MMS001. ",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "QACD",
            "description": "Inspection code",
            "type": "N",
            "length": "1",
            "defaultValue": "Drop down list",
            "comments": "No se a donde hace referencia este campo. Lista de opciones en MMS001. ",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MMS200 / UpdItmBasic",
            "departmentId": "3"
        }, {
            "field": "SUNO",
            "description": "Supplier number",
            "type": "A",
            "length": "10",
            "defaultValue": "Drop down list",
            "comments": "Referencia en CIDMAS (CRS620).",
            "required": true,
            "panel": "Purchase, Sales Infor",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "RESP",
            "description": "Responsible",
            "type": "A",
            "length": "10",
            "defaultValue": "Drop down list",
            "comments": "Usuario del comprador. Hace referencia a la tabla CMNUSR (MNS150)",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "2"
        }, {
            "field": "SPGV",
            "description": "Commission Rate",
            "type": "N",
            "length": "11",
            "defaultValue": "User Input",
            "comments": "Normalmente se suben en blanco. Pero con el portal, se le debe notificar a Frau para que llene este campo.",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "4"
        }, {
            "field": "TAXC",
            "description": "Tax code customer/address",
            "type": "A",
            "length": "3",
            "defaultValue": "User Input",
            "comments": "Referencia en CSYTAB (CRS130).",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MMS200 / UpdItmBasic",
            "departmentId": "4"
        }, {
            "field": "CFI3",
            "description": "Mezzanine Item",
            "type": "A",
            "length": "3",
            "defaultValue": "User Input",
            "comments": "Referencia en CSYTAB (CRS183).",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "CFI5",
            "description": "Seasonal",
            "type": "A",
            "length": "1",
            "defaultValue": "User Input",
            "comments": "Referencia en CSYTAB (CRS185).",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "STCN",
            "description": "Storage Requirements",
            "type": "A",
            "length": "2",
            "defaultValue": "User Input",
            "comments": "",
            "required": true,
            "panel": "Measurement Information",
            "transaction": "MMS200 / UpdItmMeas",
            "departmentId": "3"
        }, {
            "field": "SPUC",
            "description": "Fixed or dynamic sales price U/M",
            "type": "N",
            "length": "1",
            "defaultValue": "2",
            "comments": "",
            "required": true,
            "panel": "Purchase, Sales Infor",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "MABU",
            "description": "Make/buy code",
            "type": "N",
            "length": "1",
            "defaultValue": "2",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "ALUC",
            "description": "Alternate U/M in use",
            "type": "N",
            "length": "1",
            "defaultValue": "2",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "STCD",
            "description": "Inventory accounting",
            "type": "N",
            "length": "1",
            "defaultValue": "1",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "SALE",
            "description": "Sales item",
            "type": "N",
            "length": "1",
            "defaultValue": "1",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "ACTI",
            "description": "Active or catch weight item",
            "type": "N",
            "length": "1",
            "defaultValue": "0",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "CAWP",
            "description": "Location-based catch weight",
            "type": "N",
            "length": "1",
            "defaultValue": "0",
            "comments": "Depende del valor en ACTI.",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "PRVG",
            "description": "Commission group",
            "type": "A",
            "length": "2",
            "defaultValue": "NA",
            "comments": "",
            "required": true,
            "panel": "Purchase, Sales Infor",
            "transaction": "MMS200 / UpdItmBasic",
            "departmentId": "4"
        }, {
            "field": "CUCD",
            "description": "Currency",
            "type": "A",
            "length": "3",
            "defaultValue": "USD",
            "comments": "",
            "required": true,
            "panel": "Purchase, Sales Infor",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "4"
        }, {
            "field": "CUCS",
            "description": "Currency - sales price",
            "type": "A",
            "length": "3",
            "defaultValue": "USD",
            "comments": "",
            "required": true,
            "panel": "Purchase, Sales Infor",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "4"
        }, {
            "field": "DCCD",
            "description": "Number of decimal places",
            "type": "N",
            "length": "1",
            "defaultValue": "0",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MMS200 / UpdItmBasic",
            "departmentId": "5"
        }, {
            "field": "PDCC",
            "description": "Number of price decimal places",
            "type": "N",
            "length": "1",
            "defaultValue": "4",
            "comments": "",
            "required": true,
            "panel": "Basic Information",
            "transaction": "MMS200 / UpdItmBasic",
            "departmentId": "2"
        }, {
            "field": "BOGR",
            "description": "Bonus Generating",
            "type": "N",
            "length": "1",
            "defaultValue": "2",
            "comments": "",
            "required": true,
            "panel": "Purchase, Sales Infor",
            "transaction": "MMS200 / UpdItmPrice",
            "departmentId": "4"
        }, {
            "field": "ILEN",
            "description": "Length",
            "type": "N",
            "length": "7",
            "defaultValue": "User Input",
            "comments": "",
            "required": false,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "IWID",
            "description": "Width",
            "type": "N",
            "length": "7",
            "defaultValue": "User Input",
            "comments": "",
            "required": false,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "IHEI",
            "description": "Height",
            "type": "N",
            "length": "7",
            "defaultValue": "User Input",
            "comments": "",
            "required": false,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "NEWE",
            "description": "Net weight",
            "type": "N",
            "length": "17",
            "defaultValue": "= gross weight",
            "comments": "Igual al Gross Weight",
            "required": false,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "GRWE",
            "description": "Gross weight",
            "type": "N",
            "length": "17",
            "defaultValue": "User Input",
            "comments": "Igual al Gross Weight",
            "required": false,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "VOL3",
            "description": "Volume",
            "type": "N",
            "length": "17",
            "defaultValue": "Calculated Field",
            "comments": "L * W * H",
            "required": false,
            "panel": "Basic Information",
            "transaction": "MHS001 / AddIntItmMst",
            "departmentId": "3"
        }, {
            "field": "HTS Harmonized Tariff Schedule",
            "description": "",
            "type": "",
            "length": "",
            "defaultValue": "",
            "comments": "Se abrió boleto para añadir a MITMAS a través de la tabla CUSEX",
            "required": false,
            "panel": "Basic Information",
            "transaction": "CUSEXTMI / AddFieldValue",
            "departmentId": "2"
        }
    ]
    
    const lines = data.map((d) => {
        d.itemNumber = item.itemNumber
        return d
    })
    console.log(lines)
    await db.ItemMaster.bulkCreate(lines)
    res.json({ message: `Item "${item.itemNumber}" has been created` })
}))

/** update resource */
router.put('/:id', asyncHandler(async (req, res) => {
    const id                = req.params.id
    const item              = req.body.item
    await db.RouteSequence.update(item, {
        individualHooks: true,
        where: {
            id
        }
    })
    
    res.json({ message: `Route Sequence ${id} has been updated` })
}))


/** delete */
router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    await db.RouteSequence.destroy({ where: { id }})
    res.json({ message: `Route Sequence ${id} has been deleted` })
}))

module.exports = router