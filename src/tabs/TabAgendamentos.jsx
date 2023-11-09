import React, { useEffect, useState } from "react";
import TabBtn from "../components/TabBtn";
import AgendamentosLista from "../components/AgendamentosLista";
import AgendamentoDetails from "../components/AgendamentoDetails";
import {
  getAgendamentosLS,
  setAgendamentosLS,
} from "../utils/agendamentosLS";
import { Alert, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import DialogAlterar from "../components/DialogAlterar";
import checkAvailableTime from "../utils/checkAvailableTime";
import { getList } from "../utils/listContent";
import { textFilter } from "../utils/textFilter";
import AgendamentosCalendar from "../components/AgendamentosCalendar";

function TabAgendamentos() {
  const [localAgendamentos, setLocalAgendamentos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [observacoesV, setObservacoesV] = useState("");
  const [cargaV, setCargaV] = useState("");
  const [descargaV, setDescargaV] = useState("");
  const [recorrenciaV, setRecorrenciaV] = useState("");
  const [isEntregueV, setIsEntregueV] = useState(false);
  const [selected, setSelected] = useState();

  const [subTab1, setSubTab1] = useState(true);

  const [openDetails, setOpenDetails] = useState(false);

  const [openAlterar, setOpenAlterar] = useState(false);

  const [disabledTimes, setDisabledTimes] = useState([]);
  const [dateObj, setDateObj] = useState();

  const [resultado, setResultado] = useState([]);

  //controls the value of what's typed in the filter field
  const [filtro, setFiltro] = useState("");
  const [dateFilterValue, setDateFilterValue] = useState();

  useEffect(() => {
    setAgendamentos(getAgendamentosLS());
    getList("agendamentos").then((value) => {
      setLocalAgendamentos(value);
    });
  }, []);

  useEffect(() => {
    setResultado(localAgendamentos);
  }, [subTab1]);

  useEffect(() => {
    setResultado(localAgendamentos);
  }, [localAgendamentos]);

  useEffect(() => {
    checkAvailableTime(dateObj, localAgendamentos, "collapsed").then(
      (value) => {
        setDisabledTimes(value);
      }
    );
  }, [dateObj]);

  //every time the date filter changes its value
  useEffect(() => {
    handleDateFilter();
  }, [dateFilterValue]);


  function handleDateFilter() {
    if (dateFilterValue === "1") {
      //today
      setResultado(localAgendamentos);
      setResultado(
        resultado.filter(
          (item) =>
            dayjs(item.data).format("DD/MM/YYYY") ===
            dayjs().format("DD/MM/YYYY")
        )
      );
    } else if (dateFilterValue === "2") {
      //this week\
      setResultado(localAgendamentos);

      const today = dayjs();
      const dayOfWeek = today.day();

      if (dayOfWeek === 5) {
        return setResultado(
          localAgendamentos.filter((item) => dayjs(item.data) === today)
        );
      } else if (dayOfWeek < 5) {
        let cont = 0;
        let currentResult = [];
        for (let i = dayOfWeek; i <= 5; i++) {
          cont++;
        }
        for (let i = 0; i < cont; i++) {
          const currentDate = today.add(i, "day");
          localAgendamentos.map((item) => {
            if (
              dayjs(item.data).format("DD/MM/YYYY") ===
              currentDate.format("DD/MM/YYYY")
            ) {
              currentResult.push(item);
            }
          });
        }
        return setResultado(currentResult);
      }
    } else if (dateFilterValue === "3") {
      //this month
      setResultado(localAgendamentos);

      const currentMonth = dayjs().month();
      return setResultado(
        localAgendamentos.filter(
          (item) => dayjs(item.data).month() === currentMonth
        )
      );
    } else {
      return setResultado(localAgendamentos);
    }
  }

  //everytime the card inside the list container is clicked
  function handleDetails(e) {
    const id = e.target.id;
    setOpenDetails(true); //allows the displaying of details
    const solicit = localAgendamentos.filter((item) => {
      //returns all the information of the clicked card
      if (item.id_agendamento === id) {
        return item;
      }
    });
    setSelected(solicit);
  }

  function tabContent() {
    if (subTab1) {
      return (
        <AgendamentosLista
          filtro={filtro}
          handleFiltro={(e) => {
            textFilter(
              e.target.value,
              setFiltro,
              setResultado,
              localAgendamentos
            );
          }}
          lista={resultado}
          handleDetails={handleDetails}
          setDateFilterValue={setDateFilterValue}
        />
      );
    } else {
      return <AgendamentosCalendar lista={localAgendamentos} setLista={setResultado} />;
    }
  }

  const [openSnackBar, setOpenSnackBar] = useState(false);
  function handleAlterar(e) {
    setCargaV("");
    setDescargaV("");
    setDateObj();
    setObservacoesV("");
    setRecorrenciaV("");
    const action = e.target.value;
    const id = selected[0].id_agendamento || e.target.id;
    if (action === "desmarcar") {
      setAgendamentos(
        agendamentos.map((item) => {
          if (item.id_agendamento === id) {
            return (item.status = "cancelado");
          }
          return item;
        })
      );
      setOpenSnackBar(true);
      setAgendamentosLS(agendamentos);
      getList("agendamentos").then((value) => {
        return setLocalAgendamentos(value);
      });
    } else {
      setOpenAlterar(true);
    }
  }
  const [isAltered, setIsAltered] = useState(false);
  function onAlterarSubmit() {
    if (dateObj !== undefined) {
      agendamentos.map((item) => {
        if (item.id_agendamento === selected[0].id_agendamento) {
          if (dayjs(dateObj).hour() === 0) {
            return;
          } else {
            item.data = dayjs(dateObj).toISOString();
            setIsAltered(true);
          }
        }
      });
    }
    if (cargaV.length > 0) {
      agendamentos.map((item) => {
        if (item.id_agendamento === selected[0].id_agendamento) {
          item.tipo_carga = cargaV;
        }
      });
      setIsAltered(true);
    }
    if (descargaV.length > 0) {
      agendamentos.map((item) => {
        if (item.id_agendamento === selected[0].id_agendamento) {
          item.tipo_descarga = descargaV;
        }
      });
      setIsAltered(true);
    }
    if (recorrenciaV.length > 0) {
      agendamentos.map((item) => {
        if (item.id_agendamento === selected[0].id_agendamento) {
          item.recorrencia = recorrenciaV;
        }
      });
      setIsAltered(true);
    }
    if (observacoesV.length > 0) {
      agendamentos.map((item) => {
        if (item.id_agendamento === selected[0].id_agendamento) {
          item.observacoes = observacoesV;
        }
      });
      setIsAltered(true);
    }
    agendamentos.map((item) => {
      if (item.id_agendamento === selected[0].id_agendamento) {
        if (item.isEntregue !== isEntregueV) {
          item.isEntregue = isEntregueV;
          item.status = "finalizado";
          setIsAltered(true);
          setOpenDetails(false);
        }
      }
    });
    setAgendamentosLS(agendamentos);
    getList("agendamentos").then((value) => {
      return setLocalAgendamentos(value);
    });
  }

  return (
    <div className="container-fluid tab-container">
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity="success"
          sx={{ width: "100%", fontSize: 14 }}
        >
          Agendamento desmarcado!
        </Alert>
      </Snackbar>
      <div className="row">
        <div className="col-lg-2 btn-container">
          <TabBtn
            isSelected={subTab1}
            key="solicitacao"
            id="lista-agendamentos"
            label="LISTA"
            handleClick={() => !subTab1 && setSubTab1(true)}
          />
          <TabBtn
            isSelected={!subTab1}
            key="criar"
            id="calend-agendamentos"
            label="CALENDARIO"
            handleClick={() => subTab1 && setSubTab1(false)}
          />
        </div>
        <div
          className={`col-lg-5 col`}
          style={
            subTab1
              ? { height: "100%" }
              : { height: "80vh", position: "relative" }
          }
        >
          {tabContent()}
        </div>
        <div className="col-lg-5 border-box" style={{ height: "100%" }}>
          {/* if something is clicked, the info of the last card clicked will be displayed */}
          {openDetails && subTab1 && (
            <AgendamentoDetails
              empresa={selected[0].id_fornecedor}
              idAgendamento={selected[0].id_agendamento}
              status={selected[0].status.toUpperCase()}
              data={selected[0].data}
              tipoCarga={selected[0].tipo_carga}
              tipoDescarga={selected[0].tipo_descarga}
              recorrencia={selected[0].recorrencia}
              observacoes={selected[0].observacoes}
              handleAlterar={handleAlterar}
            />
          )}
          {/* Calendar view displays the lista on the right side of the calendar*/}
          {!subTab1 && (
            <AgendamentosLista
              filtro={filtro}
              handleFiltro={(e) => {
                textFilter(
                  e.target.value,
                  setFiltro,
                  setResultado,
                  localAgendamentos
                );
              }}
              lista={resultado}
              handleDetails={handleAlterar}
              setDateFilterValue={setDateFilterValue}
              buttonName = {"Alterar"}
            />
          )}
          {openAlterar === true && isAltered === false ? (
            <DialogAlterar
              isAltered={isAltered}
              open={openAlterar}
              setOpen={setOpenAlterar}
              dateObj={dateObj}
              setDateObj={setDateObj}
              initialValue={selected[0].data}
              disabledTimes={disabledTimes}
              cargaV={cargaV}
              setCargaV={setCargaV}
              descargaV={descargaV}
              setDescargaV={setDescargaV}
              recorrenciaV={recorrenciaV}
              setRecorrenciaV={setRecorrenciaV}
              observacoesV={observacoesV}
              setObservacoesV={setObservacoesV}
              setIsEntregue={setIsEntregueV}
              handleAlterar={onAlterarSubmit}
            />
          ) : (
            openAlterar &&
            isAltered === true && (
              <DialogAlterar
                setIsAltered={setIsAltered}
                open={openAlterar}
                setOpen={setOpenAlterar}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default TabAgendamentos;
