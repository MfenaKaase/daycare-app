import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from '../contexts/ContextProvider';
import Loading from "../components/Loading";

export default function Save() {
  const [amount, setAmount] = useState("");
  const { userID } = useParams();
  const { user, setMessage } = useStateContext();
  const [trader, setTrader] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchTrader();
  }, [userID]);

  const fetchTrader = () => {
    axiosClient
      .get(`/traders/${userID}`)
      .then(({ data }) => {
        console.log(data)
        setTrader(data.trader);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAmountChange = (e) => {
      setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true)
      const data = {
        'amount': amount,
        'trader_id': userID,
        'agent_id': user.id

      }
     
      axiosClient.post(`/savings`, data)
    .then(({data})=> {
        console.log(data);
        setIsLoading(false)
        setErrors([])
        setMessage(`${data.trader.user.name}'s saving was successfully recorded!`)
        navigate(`/savings/${data.saving.id}/receipt`);
    })
    .catch(err => {
        console.log(err)
        setIsLoading(false)
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
            console.log(response.data.errors)
        }
    })
  };
      return (
          <div className="container">
              <div className="col-lg-6 col-12 mx-auto my-5">
                  <div className="card py-5">
                      <div className="card-body">
                          <Container>
                              <h1>Save</h1>
                              {errors.length > 0 && <Errors errors={errors}/>}
                              <Form onSubmit={handleSubmit}>
                                  <Form.Group className="mb-2">
                                      <Form.Label>Amount</Form.Label>
                                      <Form.Control
                                          type="number"
                                          step={100}
                                          placeholder="Enter amount"
                                          value={amount}
                                          onChange={handleAmountChange}
                                          min={100}
                                      />
                                  </Form.Group>

                                  <Button size="lg" variant="outline-success" type="submit" className="mt-2 w-100" disabled={isLoading}>
                                      Save {isLoading && <Loading />}
                                  </Button>
                              </Form>
                          </Container>
                      </div>
                  </div>
              </div>
          </div>
      );
}
