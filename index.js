const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const nodemailer = require('nodemailer');
const hogan = require('hogan.js');
const fs = require('fs')


const template = fs.readFileSync('./views/email.hjs' , 'utf8')
const compiledtemp = hogan.compile(template);


// app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gomwek@gmail.com',
    pass: 'magic121'
  }
});

let clientEmail = "";


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
  console.log(req.body);

  let formData = {
    collectionDate: req.body.collectionDate,
    timeofcollection: req.body.timeofcollection,
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    purchaseOrder: req.body.purchaseOrder,
    street_address: req.body.street_address,
    address_line2: req.body.address_line2,
    city: req.body.city,
    state_region: req.body.state_region,
    postal_zipcode: req.body.postal_zipcode,
    Country: req.body.Country,
    collectionContact: req.body.collectionContact,
    CollectionWardPhone: req.body.CollectionWardPhone,
    fullPatientname: req.body.fullPatientname,
    PatientDOB: req.body.PatientDOB,
    nhsNumber: req.body.nhsNumber,
    patientWeight: req.body.patientWeight,
    reasonForRestraint: req.body.reasonForRestraint,
    patientGender: req.body.patientGender,
    transportawareness: req.body.transportawareness,
    requireMechanicalRestraint: req.body.requireMechanicalRestraint,
    areMentalHealthServicesInvolved: req.body.areMentalHealthServicesInvolved,
    isThePatientUnderSection: req.body.isThePatientUnderSection,
    fileContent: req.body.fileContent,
    filename: req.body.filename,
    medicalProblemsWeShouldKnow: req.body.medicalProblemsWeShouldKnow,
    HasASfGuardBnMade :req.body.HasASfGuardBnMade,
    hasThePatientGivenConsent :req.body.hasThePatientGivenConsent,
    requredAmbulance: req.body.requredAmbulance,
    typeofJourney: req.body.typeofJourney,
    extraDeliveryinfo:  req.body.extraDeliveryinfo,
    AccompanyingStaffDetails:req.body.AccompanyingStaffDetails,
    isRMNtrvlWithThePatient:req.body.isRMNtrvlWithThePatient,
    destinationRequirements:req.body.destinationRequirements,
    DeliveryStreet_address: req.body.DeliveryStreet_address,
    DeliveryAddress_line2: req.body.DeliveryAddress_line2,
    DeliveryCity: req.body.DeliveryCity,
    DeliveryState_region: req.body.DeliveryState_region,
    DeliveryPostal_zipcode: req.body.DeliveryPostal_zipcode,
    deliveryContact: req.body.deliveryContact,
    deliveryTelephone: req.body.deliveryTelephone,
    BillingEmail: req.body.BillingEmail,
    billingPhone: req.body.billingPhone,
    authority: req.body.authority,
    otherinvoicingrequirements:  req.body.billingPhone
  }

  
  // var mailOptions = {
  //   from: 'gomwek@gmail.com',
  //   to: 'gomwek@gmail.com',
  //   subject: 'Ambulance Call...911',
  //   text: 'Collection date is:' + collectiondate + '\n Time of Collection is: ' + timeofcollection
  // };

  var mailOptions = {
    from: 'gomwek@gmail.com',
    to: 'gomwek@gmail.com',
    subject: 'Sending Email using Node.js',
    html: compiledtemp.render({formData}),
   
   
    
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  res.sendFile(__dirname + "/ThankYou.html")
  
});

app.get('/ThankYou', (req, res) => {
  res.sendFile(__dirname + "/ThankYou.html")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})