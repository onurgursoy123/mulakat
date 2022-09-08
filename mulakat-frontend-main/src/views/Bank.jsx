// ** React
import { useEffect, useState } from "react";

// ** Reactstrap
import {
  Col,
  Row,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
  Label,
  FormGroup,
  Button,
} from "reactstrap";

// ** Layouts
import BlankLayout from "../layouts/BlankLayout";

// ** Third Party Components
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  bankName: yup.string().required("Banka adı girmek zorundasınız"),
  CLMax: yup
    .number()
    .required("Tüketici kredi faizi maximum miktar girmek zorundasınız")
    .typeError("Maximum miktar sayı olmak zorunda"),
  CLMaxAmount1: yup
    .number()
    .required("Tüketici kredi faizi 0 - 12 ay faiz miktarı girmek zorundasınız")
    .typeError("Faiz miktarı sayı olmak zorunda"),
  CLMaxAmount2: yup
    .number()
    .required(
      "Tüketici kredi faizi 12 - 24 ay faiz miktarı girmek zorundasınız"
    )
    .typeError("Faiz miktarı sayı olmak zorunda"),
  CLMaxAmount3: yup
    .number()
    .required(
      "Tüketici kredi faizi 24 - 36 ay faiz miktarı girmek zorundasınız"
    )
    .typeError("Faiz miktarı sayı olmak zorunda"),
  HLMax: yup
    .number()
    .required("Konut kredi faizi maximum miktar girmek zorundasınız")
    .typeError("Maximum miktar sayı olmak zorunda"),
  HLMaxAmount1: yup
    .number()
    .required("Konut kredi faizi 0 - 5 yıl faiz miktarı girmek zorundasınız")
    .typeError("Faiz miktarı sayı olmak zorunda"),
  HLMaxAmount2: yup
    .number()
    .required("Konut kredi faizi 5 - 10 yıl faiz miktarı girmek zorundasınız")
    .typeError("Faiz miktarı sayı olmak zorunda"),
  DMaxAmount1: yup
    .number()
    .required("Mevduat faizi 3 ay faiz miktarı girmek zorundasınız")
    .typeError("Faiz miktarı sayı olmak zorunda"),
  DMaxAmount2: yup
    .number()
    .required("Mevduat faizi 6 ay faiz miktarı girmek zorundasınız")
    .typeError("Faiz miktarı sayı olmak zorunda"),
  DMaxAmount3: yup
    .number()
    .required("Mevduat faizi 12 ay faiz miktarı girmek zorundasınız")
    .typeError("Faiz miktarı sayı olmak zorunda"),
});

const defaultValues = {
  bankName: "",
  CLMax: "",
  CLMaxAmount1: "",
  CLMaxAmount2: "",
  CLMaxAmount3: "",
  HLMax: "",
  HLMaxAmount1: "",
  HLMaxAmount2: "",
  DMaxAmount1: "",
  DMaxAmount2: "",
  DMaxAmount3: "",
};

const Bank = () => {
  // ** States
  const [accordionOpen, setAccordionOpen] = useState("1");

  // ** useForm
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (Object.values(errors).length > 0) {
      toast.error(
        "Eksik veri girişi bulunmakta. Lütfen alanları tekrar kontrol ediniz"
      );
    }
  }, [errors]);

  // ** State Handlers
  const toggle = (id) => {
    if (accordionOpen === id){
      setAccordionOpen();
    }else {
      setAccordionOpen(id);
    }

  }
  

  // ** Functions
  const submitHandler = (data) => {
    const {
      DMaxAmount3,
      DMaxAmount2,
      DMaxAmount1,
      HLMaxAmount2,
      HLMaxAmount1,
      HLMax,
      CLMaxAmount3,
      CLMaxAmount2,
      CLMaxAmount1,
      CLMax,
      bankName,
    } = data;

    const bankData = {
      name: bankName,
      bank_insterests: {
        1: [
          { account_type_id: 1, period: 12, loan_percent: CLMaxAmount1 },
          { account_type_id: 1, period: 24, loan_percent: CLMaxAmount2 },
          { account_type_id: 1, period: 36, loan_percent: CLMaxAmount3 },
        ],
        2: [
          { account_type_id: 2, period: 60, loan_percent: HLMaxAmount1 },
          { account_type_id: 2, period: 120, loan_percent: HLMaxAmount2 },
        ],
        3: [
          { account_type_id: 3, period: 3, loan_percent: DMaxAmount1 },
          { account_type_id: 3, period: 6, loan_percent: DMaxAmount2 },
          { account_type_id: 3, period: 12, loan_percent: DMaxAmount3 },
        ],
      },
      credits_max_amount: [
        {
          account_type_id: 1,
          amount: CLMax,
        },
        { account_type_id: 2, amount: HLMax },
      ],
    };
    console.log(bankData);
  };
   
    const [principal, setPrincipal] = useState();
    const [mounth, setMounth] = useState();
    const [interest, setInterest] = useState();
    const [result, setResult] = useState();
    
    const calculate = () => {
      const result = principal * Math.pow(1 + interest, mounth);
      setResult(result.toFixed(2));
    };
    

  return (
    <BlankLayout title={"Banka Ekle"}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col>
            <Accordion open={accordionOpen} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">Banka Bilgisi</AccordionHeader>
                <AccordionBody accordionId="1">
                  <Controller
                    control={control}
                    name="bankName"
                    render={({ field: { onChange, value, ref } }) => (
                      <FormGroup floating>
                        <Input
                          id="bankName"
                          type="text"
                          placeholder="Banka Adı"
                          innerRef={ref}
                          onChange={onChange}
                          value={value}
                          invalid={errors.bankName !== undefined}
                        />
                        <Label for="bankName">Banka Adı</Label>
                      </FormGroup>
                    )}
                  />
                  {errors.bankName && (
                    <p className="text-danger">{errors.bankName.message}</p>
                  )}
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">
                  Tüketici Kredi Faizi
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  <Row>
                    <Col sm="12">
                      <Controller
                        control={control}
                        name="CLMax"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="CLMax"
                              type="text"
                              placeholder="Maximum Para Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.CLMax !== undefined}
                            />
                            <Label for="CLMax">Maximum Para Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.CLMax && (
                        <p className="text-danger">{errors.CLMax.message}</p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="CLMaxAmount1Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          disabled
                          defaultValue={"0 - 12 Ay"}
                        />
                        <Label for="CLMaxAmount1Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="CLMaxAmount1"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="CLMaxAmount1"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.CLMaxAmount1 !== undefined}
                            />
                            <Label for="CLMaxAmount1">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.CLMaxAmount1 && (
                        <p className="text-danger">
                          {errors.CLMaxAmount1.message}
                        </p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="CLMaxAmount2Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          defaultValue={"12 - 24 Ay"}
                          disabled
                        />
                        <Label for="CLMaxAmount2Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="CLMaxAmount2"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="CLMaxAmount2"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.CLMaxAmount2 !== undefined}
                            />
                            <Label for="CLMaxAmount2">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.CLMaxAmount2 && (
                        <p className="text-danger">
                          {errors.CLMaxAmount2.message}
                        </p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="CLMaxAmount3Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          defaultValue={"24 - 36 Ay"}
                          disabled
                        />
                        <Label for="CLMaxAmount3Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="CLMaxAmount3"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="CLMaxAmount3"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.CLMaxAmount3 !== undefined}
                            />
                            <Label for="CLMaxAmount3">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.CLMaxAmount3 && (
                        <p className="text-danger">
                          {errors.CLMaxAmount3.message}
                        </p>
                      )}
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="3">
                  Konut Kredi Faizi
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  <Row>
                    <Col sm="12">
                      <Controller
                        control={control}
                        name="HLMax"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="HLMax"
                              type="text"
                              placeholder="Maximum Para Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.HLMax !== undefined}
                            />
                            <Label for="HLMax">Maximum Para Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.HLMax && (
                        <p className="text-danger">{errors.HLMax.message}</p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="HLMaxAmount1Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          defaultValue={"0 - 5 Yıl"}
                          disabled
                        />
                        <Label for="HLMaxAmount1Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="HLMaxAmount1"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="HLMaxAmount1"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.HLMaxAmount1 !== undefined}
                            />
                            <Label for="HLMaxAmount1">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.HLMaxAmount1 && (
                        <p className="text-danger">
                          {errors.HLMaxAmount1.message}
                        </p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="HLMaxAmount2Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          defaultValue={"5 - 10 Yıl"}
                          disabled
                        />
                        <Label for="HLMaxAmount2Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="HLMaxAmount2"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="HLMaxAmount2"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.HLMaxAmount2 !== undefined}
                            />
                            <Label for="HLMaxAmount2">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.HLMaxAmount2 && (
                        <p className="text-danger">
                          {errors.HLMaxAmount2.message}
                        </p>
                      )}
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="4">Mevduat Faizi</AccordionHeader>
                <AccordionBody accordionId="4">
                  <Row>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="DMaxAmount1Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          disabled
                          defaultValue={"3 Ay"}
                        />
                        <Label for="DMaxAmount1Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="DMaxAmount1"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="DMaxAmount1"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.DMaxAmount1 !== undefined}
                            />
                            <Label for="DMaxAmount1">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.DMaxAmount1 && (
                        <p className="text-danger">
                          {errors.DMaxAmount1.message}
                        </p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="DMaxAmount2Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          defaultValue={"6 Ay"}
                          disabled
                        />
                        <Label for="DMaxAmount2Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="DMaxAmount2"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="DMaxAmount2"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.DMaxAmount2 !== undefined}
                            />
                            <Label for="DMaxAmount2">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.DMaxAmount2 && (
                        <p className="text-danger">
                          {errors.DMaxAmount2.message}
                        </p>
                      )}
                    </Col>
                    <Col sm="6">
                      <FormGroup floating>
                        <Input
                          id="DMaxAmount3Label"
                          type="text"
                          placeholder="Faiz Süre Aralığı"
                          defaultValue={"12 Ay"}
                          disabled
                        />
                        <Label for="DMaxAmount3Label">Faiz Süre Aralığı</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <Controller
                        control={control}
                        name="DMaxAmount3"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormGroup floating>
                            <Input
                              id="DMaxAmount3"
                              type="text"
                              placeholder="Faiz Miktarı"
                              innerRef={ref}
                              onChange={onChange}
                              value={value}
                              invalid={errors.DMaxAmount3 !== undefined}
                            />
                            <Label for="DMaxAmount3">Faiz Miktarı</Label>
                          </FormGroup>
                        )}
                      />
                      {errors.DMaxAmount3 && (
                        <p className="text-danger">
                          {errors.DMaxAmount3.message}
                        </p>
                      )}
                    </Col>
                    <Col sm="12 text-end">
                      <Button
                        type="submit"
                        color="primary"
                        className="px-5 fs-5"
                        onClick={() => {
                          calculate();
                        }}
                      >
                        Ekle
                      </Button>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </Col>
        </Row>
      </form>
    </BlankLayout>
  );
};

export default Bank;
