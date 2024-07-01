import { AxiosRequestConfig } from 'axios'
import { FastifyInstance, FastifyReply } from 'fastify'

import {  GhasPrescrMedflowPParams  } from './model/GhasPrescrMedflowPParams'
import {  GhasSinaisVitaisMedflowParams  } from './model/GhasSinaisVitaisMedflowParams'

import { findAttendance } from './functions/findAttendance'
import { findDoctor } from './functions/findDoctor'
import { executeProcedure_GHAS_PRESCR_MEDFLOW_P } from './repository/executeProcedure_GHAS_PRESCR_MEDFLOW_P'
import {  executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P } from './repository/executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P'
import { identifyRecordType } from './functions/identifyRecordType'
import { findProcedureCode } from './functions/findProcedureCode'
import { findQuantityProcedure } from './functions/findQuantityProcedure'
import { findSide } from './functions/findSide'
import { findIntervalCode } from './functions/findIntervalCode'
import { findIsNecessary } from './functions/findIsNecessary'
import { findMaterialCode } from './functions/findMaterialCode'
import { findApplicationVia } from './functions/findApplicationVia'
import { findQuantityDose } from './functions/findQuantityDose'
import { findMedidaUnityCode } from './functions/findMedidaUnityCode'
import { findEspecialidadeMedica } from './functions/findEspecialidadeMedica'
import { findEncaminhamento } from './functions/findEncaminhamento'
import { findOrientacao } from './functions/findOrientacao'
import { makeRequest } from '../../utils/makeRequest'
import { findMaterialDescription } from './functions/findMaterialDescription'
import { findJustification } from './functions/findJustification'
import { findMaterialInd } from './functions/findMaterialInd'
import { findQueixa } from './functions/findQueixa' 
import { findHda } from './functions/findHda' 
import { findDiagnostico } from './functions/findDiagnostico' 
import { findHpp } from './functions/findHpp' 
import { findAlergias } from './functions/findAlergias' 
import { findMedicacoes_de_uso_comum } from './functions/findMedicacoes_de_uso_comum' 
import { findHabitos } from './functions/findHabitos' 
import { findAntecedentes_pessoais } from './functions/findAntecedentes_pessoais' 
import { findHfam } from './functions/findHfam' 
import { findSinais_vitais } from './functions/findSinais_vitais' 
import { findConduta_medica } from './functions/findConduta_medica' 
import {  findExameFisico } from './functions/findExameFisico'
import  { findExameImagem } from './functions/findExameImagem'
import {  findExameLab  } from './functions/findExameLab'
/*
 https://www.typescriptlang.org/play/?#code/MYewdgzgLgBCBGArAplEiLhgXhgbwCgBIAIgEsATEgLhhOQEMBOAViYYqYFpkKAOAAxcALAIpD4TAOxD2AqcGRKGwgMzASAGmIkAtqgY18xUgDdkAJwhlwASSq0SUrSZIAbBtACqABwoMoXiMSACYBEOEuARYokIAVAEYpanCUgQA6VSlhFgTVAC0SYgBfbVIoAE8fZGDQNzdkYCgbMBdSZDAoCwqjAG0TQiIhkgAzAFd6rws3YLGLMGoxscpqfhYsgDYtriYE+BCRJhGNrgZGA7zgeA3VZDyN5AE24YtkTDnFI0Gh0kpgtc2212+0Ox1O5y4l2ut3uj2ew30UEMtG+PxI5isLXswQS8OGHm8fgCQUcYQiURi4USyQEAmoqlU6RYAmECQihRMQ1KnNIwAJEC+PN5IAoNUctgAsgAFPGkCAVaDIXTBAAWUCgPmoAHotYELLoyGAQG4QABzCrpFVuKTpEAWU1agDCIuQAGUFYFdFrTKouABBJrO0WykgUMgQHweHqOQ0+AJkDqwDqgMadSxFH5EbmZkjQAJjAUxsBcHwWM2vCACspoiBjJCNKCCzOkV4jSzJsV0OYLJYrMTrCgJFjALgbFghA7CeDIEbg4B8Lh8CgKQcUa4JDZMDM-bNoyiJsgjBMWPpC1FogudkgFsYMGbVnOmO9jK9JASqXFC4o8gC6D9IcYWM0wBkHGnSns257DIaYamJQt4zCiQovDO7ZgJ8jjdosywUNQyAbFIfAbBws5MKoIwJCIa4MKcVwxMg44JExFCiiEfAaMh37NlxPx-jyJAViAHzIHEVRXgAouhQlpie-4CYwmBgAASqhrzoZ2vR8TmECWHBihSmWcGiieSHNvJbZqRhXbzNhKwsHwwhSMR8BSFwFBqMgIiSL6TAbBQBxZPA8BXNEUgMCMW48jxWYmLuqKjBMbhTIh1k9jh1D2Y5zmue5txeWROx+QFUhBSFLBhRF8Lye8FhWee5AOHQmVOQwLluR5+U+UVXCBcF8CheFW5yYiyLGGZGLWHYjUkLi-6kASUC+P4gTTWSkTRLE1JpPSjLMmoCQCByma7sMYAMPowSOuJABycRKQA8jAjoADIALPXbYjr3Xi1VCbVIlicE932gwYBkAAXvG4DbjFXLVvF4yTNMsw2b2uH9qog7DqO46TtOs5nPOi7LsAq7rpuVWCcJTZ7tNGNYyOY4Tl5M5zguS4rgka4bBuQ38SNNNohNWLTbNQruJ4i1EitwRrRSm1JNtDJMiyqgOUdO5yWdF20P0kHIdeOnBCAIxHiBd6yuUyAAB6No4fpnTASlkEiMB+roDAWHeT2S2WMNcr+cmmh0xnBG2HsND98BkEBKoACLEjiTCCJClFDj9VP-aJ1TBFK8aJjDPFxZyCVIyl16o+l8DLuR1yRCEw6ecIREjkczdcNXLA5PZEUsMgzgPr91OmbTwTV1ItcbPXjciC3OwjO3nfd3wvf9z9Asj0LliTWA2KOGLZkLUtxKreE62UvEiu0jtKvCMINwa3D-HaxpZ4G5esy1hbc1W7bwTiRQW8FgKAgBgAAcQQs0SwZAYAACFPZlgFF+QO-Fg5gFDo4CONQ5L7k6IeY8EFMxQVIB-TCX97wGyfG4F8wRVD2U-NxFBOZM6KGzleAyDAmguxaOmTkRd4Yl0RklZGmFK4rHwoRYiFBSLkUosIaitF4D0UYsxVi7FKZvD+nVfifxHASKIiRHYsiqLwBopwpRPAVFczURoYaBhBbDGFlNHEIYj7SxJHQOWG0qRXzpMrPaXcWCPyzHJCMjQyB3kqIQn4xCSCgDDGAU00SiHIWGPEq8fNmw1g9EqVU6ofAQG1FqFUjA3BQBVC7dI+hpEmgAO4MB8D4dIoAvQjAqRYJ0Lp3SKi9KDCAXAoAFn6VcEAVZUmkDDBGKMl03AAFuwbAAYDACUABLsMiz-Y7mQj+ZBmYtJolLJw5ozRwDpk3ihCyHYUZpRWOPSe09FCzw2K3BeC4l4sB7qwNeUU5IsIBjnRwHCuEnLAJYJSxoah8NigItEQjkrXNsrhGQvkVAcBEJjeAVEBCt2bpi9iHzbi+THAIQwg8-kOIasEZFxFhBorUGuLFOK+B4uAAS5ARLmSkp0Z6ZJRBYmBD-o4BOrtRQwDOhAEC+hOigJATAOMIFEzYINn02pZyYB6yycQxxz5kDCtfMnIQTFIQsE2QHLJ+ycxuENAAaz3nQeVCY0wAH1loMCdeKji3E5r8ptnbOgecFVphgA0isiYll3lNGMXQMBrDSo9jAU0hpGjGgAM+JtADAAAFJMqVdpXgRM0MG3NFh80MELRAUGpovZSrQDAMYepDSgNBnaCOhaQEWDlSstweky0wEmQAL4sBEgAlAAfktiQFVaqNX6yydq6hyBYEgAhaDIwIw7w6VSdFXiP93A2rtSQAAji+Mg1sGDpFjWgD2TrE2grqGaMgoBNknSGD6wVdAHaBEUKKNMEA+3IBgEOiVoDFnAJsE+CVExPZZoABJ+ldIWuOEpC22D9MhuA05rD+FFUJOA9bEFjonVOky6rUlarMDqpdK7Wi0HXW4Tdc7t1DAtWiK1YBbXTRVI09IoMv28EVRAJ1tVn3eoNi7XJusyPjJIAKv1JBrodBVFGvtozg2mNPSAS2wxiO8pSXOoWlHl0NFXbRjdyBxmwznSxy1+7OPcfDFAdIDn3WKajaakJUn9Myd9cEGDDmU1DqWaWFZcElmitsK6OIWnSA6ck-pvlFmKMLqo8ZmjMA6MMf00xnd0m2McdVPZ6ATnoBOoqdAO0ESnWlmQKF9zL6YnSdk7nThjrAgxqVDGu0xoH1BYsCFiJMAAM6WjSqAAh9HWtor61kCtZDDt1WdIWCfM0UwozouTsgKqkjM7NWJfRIZ6ja6zMWey8xn++JbMFaaQ54rUAnXDfu11k0ibDBbvO+R7z76SABta28GALSYC6H7WU0CJo-2AUUDHVTRo-3A+aLoVTza-1DZtqA4bdbMD-rlaGpb8ZVvrdi6R+L5H50vhS4wNLXQXwnfGdZ1jl3HBceu0V5zugJjNEjKMqrntIeILq+9xrPnHBeC-kO1ToqKBllNJ4GAhoUBQFG+YcMBPNvTosyTpLZOjMU6MFT8z8XTtEDpxd9jB6me3duy6qXngnVy4MErpBjGBdeaa4CssR5KwtAYOGFT7XraafOzF1X231d7aoVrw7pn6P66y7TwPe7Td2eZ455zpYTbhh3t7wTID7uo-555udn25OfsaPx39WOuh9PGBAAAx6A3DlfICRl4wBlvf7RUJCYGRFXEAtu6Ya-FzXi7tcmfS8dg3cfcsM7oObm7znG8QGrwwTTW7tm7td3QAAYgEO0f3RVAYzYBJZEW4jI5gDBx0AA1agRHg-94++Ht0XRDRJMBS1gT-2QDRqByDzn4OefIBQ5-ow4wBw5kAI5-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-gYjuD19kjFVYdXdxDh8pD-d-jlNZdQViIgW6QFTV6cTlWDN2dqNudr2aBpV7tX2UTkAlT9TSyKalYjATR3ZMaoArwMAAAPDAFwCEJoMI6KBAB4f-pLulYCR4GMLKjhoqGIV1jpP+t01eiss-osiGXKohYgf04fUaHGAWPIYXpYwXcHWoVI5VUQ9VY-b42Q7oBTe-TU9Ez08-uerU7EwC6ucBq8GA0aBAwxNAwlhwZ0383UwCzAP0zpAlV-sM2CwBomGM5CLM9AdM3i-M4s6c8s39rhmsxswBqMoEGIR0B+fs1-oc0Oscx1g6sGT4Bc7mtcxWtk9jRI08yMa9TI1st3cUwo58980Pb8wy1UynUC7K26lAJi2FQxE6iENC5w27fBTsV0zEwq+1tGjLipRNSsy1h7Ly+023Xk4mQka8x9ZHV9RK2-VK-K709K3q70+YZDQ2dyazWdgbJEwi8C-Eyi4wOY2ZPc0HY+CLXecELq-8yGwM2i9GnECM7voNp0DiwkHiwBgS3M28MS3GKSxXY0RS54dS8gLS2DGFkG7oEy3ISc2y0Ghy3+ly18Ty-o-6z4466U+Q8o66wC8E7C2ZOJYxcO4XV9p7foAk4BjnejYCWk6Ahk4sv7U3QSZa9G9ax3WMW8929NH4325TfACqMAKaOkMe6e+6lnUk7nUvV6v6R03JrAlwBfmAjLdLieRaw88LVuyOUKzu-a+8z2y-V886y1Re2exBy5h+2QPjpq1G9q3Ay+46G+9+Z+2uw9RuwZr+9IwB940B-u06xQx5RB+eye6aFVm2Z+520bluU+8h2AuGzmJGyE9hy+DY-eSQM+6+++ygX67R+bR8726B8R2R6e8+kwmiBvGNI+NvCLMEMIK4pLMfDLKSGfPLD4jSCEGkOkCEEzPZMEi+rmEiIMoWHQLHTLL8posJGwsEAAIovjQAtBnQxzIAqQRjgBGxQpPxC2lzCLlxYRozUAJDAAJDIDwBtgLgJCCC+jCDAACDcDwB8CqDcDAC3AsDwAJAjAJcyBUBkrWf-QUq6J0AhdhcRfIBRcxciDxeJfJepfpeZfZfSBiA-TpIOLCgJL3mC1apxIug4jaN6daahjhjN7Rh0CX4uwLGOwAA6JAccs3MA1FfmJB1sZAhaUobwx64YSy4kWoexMAccoyDAwc0amaE38thoSyccqgnj99vEPy-M9i5yZgcnzipISnhIy0HioQ6n3il8NICQGUTA6QAgggXcGwhnOCaY4EjgaeR538-EeYpnwQRysHSq2kdYKATQ7X5kaEVkFcNy6MFAA4Q4jMuMLMBMjQ7MJMZMPMFMD3OY8AIoFQro4mvKsS8SYtY7H2bXjg1062h50yfPKpuzDSVqGyNHOyd3AnOYyY0keoOPrYePV4gX6UAITkQIewk4RwJwZwDAFw6g0IdwqgDwTwDPaIrw01ioJGUEuPlkKvYiuE+iUiMiFEJiZidEliIQTE1iyAbEnqms-EKNikQYr8rdRewQroxoKFSIKtWOe9oAYAIwLarxIAaA96Tsafl3f6YCSadQshiyf6XgYM1SMAXg040wPhYY56En+HKENUrCgMjg3BS2j6bnyAVvjYck6peClQDnHpUSz3MRRgCQUU3nHmvncKIiqUiK1AE4Ugw48XmKLAIwqgmKwgIwC-i4wAO-XAwAJUjkzAIw-AIw8AGiDfnY9UxXoQIQC-O-Agy-q-6-m-MQ7Eu-+-8Ah-RwJ-Z-ckvPMnaITnrY266pJeuwYfeJ3l2BDdBeDAMbiQD8ymAjK+3BATMxgAbcIAW3CtAdwAzilRmR5U1Exil6B8cw0nW3k4l3irQPuUsL7qfHJB-ctoAgQHmwHSBMQ9OXeSHjomh5yY4eR3ChNpBM4FgUeXCcwD9FrD1hseQ-JXvbwRRBd6YpPHGMzCnCsxCY1PTmNzF5j+wjOTPCgCzzZ79kOeIoLni3VY5pI+ufPAXiNyF50BroIvVvJGDkL8ciBIrAxsMDl6pgFekg1SFclESE9VgfAdYBrxODAhteYIPXgbyuA3BjepvTQVZ075qpbeUg7wTPyC7O9DEZEN3vIlMSKJlE3vVRH73UTm8UIngcAKH3Z4BsdiUfcXpNzj6ioE+4AZPvqFT7p9usmfZoOKnAR59U06aGXMXxqIUAy+FfNwFXxTq18XBLYAro3wBRcFdIbfFSJ3x+g99jkFQfvr3zG5kCdUI-Mfs4OLiwpEo8KHwbP2nAhBVADADLtwFYDlRqufAc4UwD07TMFA5UfyPfDEAhBz+WiS-jommhHCThZwnYB8lchxdrhOwW4ScFv6sopATwjYC8Na5mCABpgzrrph67-8ZoneQQNAMsGwDfMLZeMG1lgRTNz88ACtMAB1p4J-QnQWZGglARRMYAroMYNUAsAjBZkCqW7rIzBKFDSApA8WOQIPSvC5oEsT7ifFli-cL4DApgcDzyCsCCgMQzgYEBh72oyw8PPgTWAEFmdJ0wg9HjWEx4NhFeXg9SDIPShyDsYTMPGMoKp7Ew1B5MSKMdDkjaDdBgQMoRgSAFdcH2gA2EfJgsFTJMRwvWAsGnsES8vG93aXixnoBSR3B8Q8WIkL1EHCgu6vLYEEK16ghdeEIKEJENhBm9rRQfDvo5w8FwjxhlyKMckPSipDpERiDIQonMQ5CfeLEfIQHx84W8FIJQ2EUoTfRyZKhMfBgDUKxaI1P8SfFPtjjT5dUWh4KNoTLlz53ouhchIviX14ADDLAQw9BCMN2RjCh4WcJvtMNb6KA5h2YhYbeFWErClhOPR-JsNZFmoJ+47PzvsMLErAcg0gCeMcNOAr8hAG-FiDsEYHcBog-giiHwASAqBRAbw4eHCMpSOAbxUgO8b6FOHZcRAx-CgK+M7wUhPx0XH8XfEbr8R-+tvJ0YiNAHIimIycA+BgRgFwCYM2I45ABjxFdkYMhI47jrTGCFpP0FIo+m7ALBdBRsFRFkc4MDHECpOT3XMeiFe4UDZYVAlTt9y8Qiir4YolgbkG94hAOBYlLgcEB4EVolRwwJHoIMcCo8RBoSLURIJ4mRj8eqvPsMT0xjyDjRFPNmOaNJhcxLR0oxnsz1Z72j9BBsDCdz2kzIj+e8eAicEBsE+ixeDgyXkuK7Zog3BMkHUfmL0mO8-BAQuMTsATHCAde4IfXpCEN6piTecIdkfJDiE28IxuosKb4OLGu85E5Yz3gxFyG+9-e1k+scULAClCHJE7VsdH3kodiVStQ7sYnwaHTs08zQk0K0Oz4dDxxMhboVOL6GzjK+C4mvv5Jl71iL+tnZvjMM3FZi3gXffiIsJdjLDdxB4ofkeNoCj8TxlmHYcMCn4BdwpFAMcCxCYA5A3IoPWcMID040RgoGwBcDIEcigT5AwADfqoH-GFdzkQEugMdJYCnTzp4gFeCIBukdxgA90rgI9NAkyAFAb0mEeAJ4lOTjBSIt0WyHCAoTC8Hk5vrMiPBWo-0XZS-JLl9KFMOJdYhENxLIF8SeRgk9xLQPPgKwAeQPFgVICYh8ApAMkvcHJNh4KjeBoglUUIJWwajlJWkv1AkOykO9fBhosnooPxhmSOYFk9QfTwzE2SdBdksPlqzAFGDwmLkt0W5OkyYzrBtg30eL1abEySZp4gKa4NDHBTPBoU8WbP1jGa8QQsU0IcmKSkwgUp6YziShAykhTle+o8RARAMQlj0hBUrIRWK95VibE5UooSHybFwlDGkfeqdUKaldivarUvsR1MHFdThxPUscdIQL49Dpx-Q8vnOOGFjSgxVnKaWuNRKzT2+8w7vmtJWn7iVph4jYVtK2Gni9ppAA6f7PRgTgRgK8ZmK1BCAjg4u2MI4EoB6hJAmApiYQBV3kC3NxhF-IrnTH7mDyDgw80eayheSTyPwUgGeSoHnlhQ4ZHwsyIjJAGF5sJSQZuOiM9FwDjGqjJZM6DADmB0IPpOBDNmJBewiZ0vI3GlM5HjRKZlAvkW4hoFCi6BokhmcwM7xMQPk7M6CJzPlHbNFJvM-MKqPUmCy5Qws32dIOjEGjDJDMBQSaMp5Ew5ZtPDQWlKCk5jRZts3uRFMBDxinZcUsIYlIiHuzohaUy3tmPDFmRdJdslIYHJd6ljQ5HvCxMVMjk1jo54wyqdVJbotjE5VQ2PinMGwtT6hGcssJ1NAQ5z2hec-PgNLL5Fzhp846vukFGEWyl57w6aeuL0h1ztxDcgfqtIcWtyF0x49ifwgGCCI9h0-AnrPzOk4T74sXXgDRFpSZcO4jQEcH9LBkTwhw2KLYB9O0RiVpofizvAEpEBBKRArUSiNOF36RKCIH4ZkGDNEZ-9YR6EwwcAOQjIz4ZKI7IJknwkYj756jDOgdzICJokQbgD+R4AbI-ydpzGf+eTK5FAKBJIC5TjTPAV0zNOKQcSbkLoRSi0phoWUdwO5koLQkfMtSeqNEHYKbZfsvBQZJJ5GjyeSgkhaoPllWTKFVs6hVlNoU7LcIDsxhSEKTEJSUx7C1KUrPrE+ytluCq8U70EVpDjEmQ0RZWLyFlTOFDYqqXHPD4ok2xDUzsSorTlqLGh-YzRd1J0WdD+pk4gxUNJLkjSTFZiiafX0sXVyW+NircQtJ3EOLm5g-HiZtMModzdpMKfaV4sOm+DyIenYcP4J6jNwAR-UV-v4JHDZBCl1wrIBuDwkWKAJV-aaCyrHDzgYg2jVmV5A2h8BeVEMuLlsEFXMyeYJ8nHufIqVYSUZE4KeLfNG65wyw36GotKmaXHcwA-TYCKAnEjRpHQQVOMDzQGyOgVkG4kAFwEvzHdLu7S+6OhBTTAQTZPSv+a8rJlIhDxgy97sMoFGqdPEwo+mZMsZnHCJR0kqReQEQUkAFJCPfgWgv5lo8Nl4gkWZcu2VfKUgBC4yQcplkqDzJ5CxWV7PaDnKeFzCMWXQtuXRSmFLsx5W7KiEvL616U7hZlN4UtrrleEH5cHL+WFSxFViascCtDXSLY58M5seUK+xQrk5nhOob2IRWZyM+2i0caioLmDTS+WK4xYuIrmZiq5UwmuRuNsWkr7Fe4xuZSvWEuL25O09xZP0ZV0K2wDIdYAlIeCPBDgogYEY8nXS3C+AIQLvKoAS55cS45KL6dfy-UzLf1SgJ8WdNkBMBgNzANiOBrIhQbNVQ-bVd+3hGvhou3vQ1VYJIBHU32XZOIF7EgBPhb08pWwOhGoQwI-Q1cWJjACY0WQbAHaTfEqGQoeMCBQoJwWeLDWjQKZmIN7p4mplgK1OEChNYwKTW5Bm4fAeBb8AzVZqlJcoVZXQAwUFqseRaodVctLWSyiFpk6tWQssl08rRfaqhU2vrHGafFMY-wQwvbX3L4p4Qo3mmLTVcKFp9mi5CWqc1Fix1+U93tkIjlAqChc6+SDIvBXqzIVScpReutUWbr2pGirOVoqz4oq+pB6jFUesGFlzTF404MX8isVXriV806AGSvvVOKNpbcmla+uhQeLdhZcOhV3hHmKA3eDAKQBFEOBDhTgKgbgBsFNi7BTYa-ElLyJg0TDT5o8RwO1p34zhKI3W3rbFP60MBBto4EbVlyf4Tb14-SwBZJv4lRrxYoCwUXJvGX-dE1zA2-myHZBpr5lBcLmcguzXKjc1aygWfpu1EfKkhQW3ZUZP2XSzTRpCmnlZooXRa7Ng65tY5v0k3KXNgQtzYmI82sKvNHsnzZVouVGbAtMO0dZIl+Vliw5RU6dVHJBUXqrwO5PkiChJVVa5Ih5aJjeqq1D9lpj69+GDDkzAAfAE6alZBsYLiwwAUaCvvdBGAqRqgAQCABLTqQeJtpfakBBWmDhMboAr1LhNDBqkJzHAcQL-NBkYFNFqiBoWVGyC1BsgcKcpHkmX0xyJ8oA8yMYCAFMW7oyw9aGbarroDAwXtZ8spc6L5aOi3Rl+b6IHgmT1KgY389zJZjZHL0A24BIwZUod2u6ERY7Ewa6KqVshoswwfWTNEIpdkEqGpQyoRRVDG6s0+utkCqDYm-yzZ7E+tcntGTIAHYFAJSInGcleYZdyAClWsIszXhWdl0AABpJ7h+L6gMaXt6VnqSBFpEFKH1agNBn5XpQzY+0uiewmeZ0SbABkdAsTpSMAZkAIF0Cmh-sTSTQePy7kXjvF2Ov6eBpYDraYJO-cQNVwYiLgDoBwXIMdKUQuQ1ginfLsvLg3TRD9rAE-Xv1JhPjFAr-a-VwFv0bB79EI-wU-se7hqNpka6TdGuoFna418miZYpuu27BhVam9NQsvklLKXd2mt7bpvWWaTC1OCn7djtM0mTDlsskHQrJs2kyG1KYa2TpOHWlq21wQxHSwqeU9rPZNB-tX5sh0Oasd4UvKcIrC3hzxFkW2saJtFWrjL15OuQpTvR0-RadkAenZPrRBM7m9GBVMC7FqAc7d01KqXWXpIB87dAAuoXUtVF3i6QAqqRqPoYkOhgjucuyAFTiV1pYl1tU4IOro9gdojKLlN4pQCEJ2gDWoMReRbyEj2Tcx3DHYs7q03x7NZ4yEnGAKvDe6u9KeqI0HtOwiaaD5enSFXpr1hGtZ9eivU3va45hNDcmR0J3t93d6Gtve82SXu3TBjXSw+l0KPuQDj6WyKhiI19nO5TcruMAG0LSAEBl9bA2+7YfSu7kfqR1x-ZbWFxohhcSxd8RZKcCyAxAJwiqjcOIA2ARBf+U2l-YBPg3+AetMxyELwCulxczEyx6ZmxG-F+QBAmxqcHtogNUqoDoQGTXAZ+4IHLtSB4Hh+CYisg0DD2uUZmqwNabjOuBtUR9oIMGaiDBY37UTz2VSziFFBi0dZrTUQ7oTOU+2XDqiksHnZDyzzclI4XRbfN1vdE-wuC247x1+OgFRFtKlRa+1pW6uTIcWRyH65-ERQzpCp0dHSAah4o63q0OYRWguh+rTYYkOkAjDJh4XYwCVYWGrDrirgzLuO7IB5dThkFA6Md0kA-QfoyohXvaz-ZPYgQBhv+grSDJmmGpCdHbrCM9cUSTGyvGzkgweBZIuqmPcYLj0dcrwkoZI-7vFCZtzoBYYAFBhPDjJ0jnEXdA3pyO16XTH2BvUUee4lG29AprvXoaDN+SB9XEinS0BH3wAx94ACfTjxRJeqQIjsYQl9Evy2A44kIag8HrfXnie5I60rgwG0agSuA66e8bShCA0RWADIAA4IEUDzglA5EWxDsfeErycQoXBs09ObP69Yu+vDs+sF9D2RsUVPfsyMEHOD7HjEmneFTJgNCTaZGnT4+JIZDyAyI-xjTcCdQXI93t+ayE19oYPQ7wppBytUDuOW1rKzRnNE99phPY7mDMU5ha7LYUcG0d7y28-wdykhahD-y8LaIdpPiGjODJ6Q0PpaCcmFDI3OnUhcZ0Pr1DZkUo7MEFOUJhTPOsyOKcsCC7JT5h+oJYcl1pSFTDhhXWMGcNqmp99sLU34R1OgxsKrwFpCHA1I26DYFpqPYhzkw2nq0fpgM0NwI1Yc3TwQD05UZT1CXfT9pz2GkdSQZHRTEyCveGbyMuisjjejC8UYvDxmuwuF3JjQh72my+9IanpQ0YQuNjRQLRtoz4C5MR9HABZy7qcy9icak+C6MAJDBGOdyxje+plbPyYjroN+dwAA39Ni5RSweMQCgMACYCMBht1w6uNscmnDnX9OILLioDbCUQPkFASK9sGituQ4rCVgeTPLXAPHxNAyw7VuZO0jLZN8Bi7aKMZl0JbjTAQ6Gmo3y29YIwQcZrBBgDWxdAbgSANgFm5qgNQRSWpJNfSC1JGQdoB0JAKYBahrYaoQa7NwAB84zHwBtYV3gBTQa1yiE9DmrQY4grUb1RAARy6mkCaYcZlqB2uJINrWoLa9NwsDTcwAz1165te2tdBdra1g4G7CtTNUAAZAtrDBuAAA3IDfjBuBRQYN0BK6C+IUBIbnCe3WDfMBuAbrd1vazdaesvW3ruNz612Wfm1gLrYYJG-6cCBg2xcWOcwMHCRDhhC0IwV6kiDPxVpIbzQaG8gFht-oHtQBbG2tfet42PrW1rskxuDjQA2bM2GG7AQ9hnR2lVRQAtbDeCFoGA5gDKm2DICIAJbHN2G3zYFsC2CbNIusE50GQxw8KIMe4ksg6It4WlQWAIwwAXriZdbuN-W8LZgDiRccGVN4NUHNiBYz8+lGNHeCduvWXba1rsnHATCuxWy8AMZh1lRo1pVMaeRQJWHRo8kg7gtsAJ9fGaY21rvoN24rdqiA2Ik5Nzm8vpGCF3kbFN6wBmlrD0i4ImeWVIgUsD+Asc1QTAJmhiAHQAApLLgWQRI3ANaZAMOl1OYBo7S1THFdcCDpAMb31+63zZuuwQ1rIYFSegpYjcIZS3S2w8ckjhu4v8IAGFfDf7TBgoeGBp7YqPPOqS8DEJxHpsuAufLYTZa+E2ZvIMWbKDpy8HY2t4MBa77X5rE47Pc1sHu13mkFUBZoUgXZ+ghkOcIcJ0lSZ1dJ+U28GABDoHLLQHEITaOsdoTrpiRNOdZ9ET3kAet3G39YlpmqktNIhG4rmQBuACHr1wm55yjQyoyAoRGwNTeQC02s8DNpmzLgAxVo683NtMEAWofFgPLYtqALYJlvex5bp6JW8GlVsM3ACiAOvII67K0jCRxyZYB2k8PS4Lb0BGWwaelxyo7bDtwIEo7dse3C0Xt8JJ7AiR+2j6f6RSSY-DsGADHo9k5nHcTAJ2TVR1mXekEEe52EalgYAEyOYeMiq7aOOkTMPrugJG7wCGtnKk0Tt3IQAgbu8hXNj93FUQ93ZiPa-KaJscbwRVDxebWk7p9rwKUB4FaA77-LtZ0tdkB61kROE0zBLuvzYieRk4sU0cKF1ZlQajzi8lcQktm10AanEUE4SODCAzzgZfAFpw5CG0dPkU4gfecEb0D7bZO1V0WK8djXvHGrV8bTrSEyDXTb+sy6LS-DwJFzmSgw0GNXyExZabcUhJ9HJEqBTDSlzpi+Roe8VjXNQOoPUAaCNDPYLQVoG0HNc6SihuknoR62U7cgzhkKIKAZIDHOwJHagbGOQm4BLDpa6gZGr0XQEdAIvFk7SgyAONRecRhNaUre1eF3U5991A0n6Kj2V1yKw9UAbexi-ACAJXYqyPkhOl7rPymXSyFlw4NDMIOkHqpxwF2XEgDNEVGWnu8bbovvydIkaVvODnuIgQ4wPuKQQACu35XD6NBKleB0tEkBjnwFBmlKy3oCFaQ+8QSWRs43AJSDtJmglDHUjqUoSLJvlon6BmWoMH2H8Sj4KpKgw6dIGgLtBIhpUhaDi7E3QRp0K6f6L2ArsAKqYfiZYb5z1lVJZjM9M1JZPxVbxqlbw-gQtC0hAxeVuawVcNG5eaAsW-01FKAs-g6DyldmhFUmsARbRZ5h0haQJgNiCz6nTbMulfYMagIZ7m7hFKAsQVra9Ng0ep5u6oBoqQFC3bb1TFCLHeFoVQrURYv69lSYAB7cAZHIjWAKy0IATDxHOpn9w+O8bXAQ98HYsDKPWHqYWVCNDAAsTwwf2VxrO0UC-pC0drh1ypj-TiQvAfoaAp4EwDmxJqoqR0DntjQb6AA6je7cAVBC0aORB0oDBg6vRUFSVskW8raUBwwF11lmcz-TwYzqt0e6BKAACDcQT6PdHrqLt-05gdrB2hvbo1M0o9UVHHAbcqLFAtaXZocT3yfkTibhPJ7+kzRKRU2JobF4WjDL+FdyKzaWg9q9gnchmSyJDyAH3BtoBSYATEqXXY-AZ8Rh3WpGAELRxBuwlgb18e8PdcB9P3ZXjFpWfdxBN8U1NaVpXdjQJFkYAN120RpFA1UAFQGdkG6lT+ANX0H7VxvtFSgoxCBIAbMESsdBGxUttvVx4Dj4dZTC7SjrKCjABKZAihfMgHXkLStkgIJnmdisnvfBvsMoCSjXEEvwCErn+756wZ6M+PRNXMHl-Bmy6AAZRA0BWKTO7I8o4O0GTIyAhD9pROexE0edgDh0iNEm2gQQtLKIbvRo67rsUBGAFmRo34+RkVV+bGDQmm3ApXk90e4PfrfnrtIlt4GjaykVlg-2IdFADdWEF-scyBZAnc9gFuEPAavJ-HyyqysK9aXv15l-c9cWICMASvPLXcchkfAsyZljm+jR-fqEHgJotHDOjN3M0uzUijN8ocMegjbgU0CslCdn4-Qtga6MK77RzAW8h3m9z68-cFeivy74Mtl7e8hvm7mT+ZRrvDczgvYCuMXOO6+9OVzVipPBIny9IGvvYyALULhgoD9ojIYWCJKaCtVOdFkPrlSJxZDcffpszNDtG4TxctDahD3+pjqYp+3hxXajlaqt-K943tvpzXb4gVGRkVcfx3hn2d-mSuF-87l3SqBFu+7NRUEAeZCQWnbtvgi278HPVNmSi-VMyj+6FKGe8ZfzVZPzz6piZ-x3fv-31wkM2B9QYwfl3Him7DL6ugwEhXzrCu9J-JoPPSboHxh6GaXpqfS32ZO+VAAQAtQrYOn+7+DSgIw-P33DNLVI-VZkwJSaNGgDaUrvo3R3k78fVaFN3zo4vzP+99Uwy+0acv0VxnyV8gJHv9v5Kur8NASutf+nzb2t8M943cVJW6bWVtKegwomR4VnSg533EAtIvT-5FeFgTnvI4BAb8AQET7QAYAVCSgO5wJWt2cA6qAAORMmoYykdHa-8LSv+iVsw7-1-9HQT2GQAt-MAB-9X-BzgWlnOb3FeB3OVsiUNX-HZAIACAGAB7Fb-P5AgB1dXFyTs-0XAAQB5cdAEUh0gbFgtAcZPUEzRM0FgiHtsANa1QC0AhgLQD7-avQ38xIHkkNA+QdZjeAqAz0HSA-kPgNYDqgBt3oDGA4dDBsUAm-whR0gZ7EzRMA7AM8dKwYdCAA

 */
const validResourceTypes = ['MedicationRequest', 'ServiceRequest', 'CarePlan','QuestionnaireResponse','PlanDefinition','Practitioner']

export async function promptuary(app: FastifyInstance) {
  app.post(
    '/webhook/endpoint/path/',
    async (request, reply): Promise<FastifyReply> => {
      console.log('Chegou Requisição Medflow')

      const body: any = request.body

      const urlToGetBundle = `${process.env.URL_BASE_MEDFLOW}${body.data.bundle_url}`

      const protocolOnMediflowObjectRequest: AxiosRequestConfig = {
        method: 'GET',
        url: urlToGetBundle,
        headers: {
          'x-client-id': process.env.CLIENT_ID,
        },
      }

      const medflowBundle: any = (
        await makeRequest(protocolOnMediflowObjectRequest)
      ).data

      console.log('Bundle Medflow:')
      console.log(medflowBundle)

      const resourcesToProcess = medflowBundle.entry.filter((item) =>
        validResourceTypes.includes(item.resource.resourceType),
      )

      let index = 0
      const doctorData = findDoctor(medflowBundle, resourcesToProcess)
      for (const resource of resourcesToProcess) {
        const attendanceData = findAttendance(medflowBundle)
        //const doctorData = findDoctor(medflowBundle, resource)
        const recordType = identifyRecordType(resource)
        const procedureCode = findProcedureCode(resource, recordType)
        const quantityProcedure = findQuantityProcedure(resource)
        const side = findSide(resource)
        const intervalCode = findIntervalCode(resource)
        const isNecessary = findIsNecessary(resource)
        const justification = findJustification(resource)
        const materialCode = findMaterialCode(resource)
        const materialDescription = findMaterialDescription(resource)
        const materialInd = findMaterialInd(resource)
        const applicationVia = findApplicationVia(resource)
        const quantityDose = findQuantityDose(resource)
        const unityCode = findMedidaUnityCode(resource)
        const especialidadeCode = findEspecialidadeMedica(recordType, resource)
        const encaminhamentoText = findEncaminhamento(recordType, resource)
        const orientacao = findOrientacao(resource)
        const queixa = findQueixa(recordType, resource)
        const hda = findHda(recordType, resource)
        const diagnostico = findDiagnostico(recordType, resource)
        const hpp = findHpp(recordType, resource)
        const alergias = findAlergias(recordType, resource)
        const medicacoes_de_uso_comum = findMedicacoes_de_uso_comum(recordType, resource)
        const habitos = findHabitos(recordType, resource)
        const antecedentes_pessoais = findAntecedentes_pessoais(recordType, resource)
        const hfam = findHfam(recordType, resource)
        const sinais_vitais = findSinais_vitais(recordType, resource)
        const conduta_medica = findConduta_medica(recordType, resource)
        const exame_fisico = findExameFisico(recordType, resource)
        const exame_imagem = findExameImagem(recordType, resource)
        const exame_lab = findExameLab(recordType, resource)
        const prdParams = new GhasPrescrMedflowPParams()
        const prdSinaisVitaisParams = new GhasSinaisVitaisMedflowParams

        prdParams.nr_atendimento_p = attendanceData.resource.identifier.find(
          (item) => item.use === 'usual',
        ).value
        prdParams.cd_medico_p = doctorData // 1367

        prdParams.nr_prescr_medflow = medflowBundle.id

        prdParams.ie_tipo_p = recordType
        if (index === resourcesToProcess.length - 1) {
          prdParams.ie_liberado_p = 'S'
        }

        prdParams.cd_procedimento_p = procedureCode // 4397
        prdParams.qt_procedimento_p = quantityProcedure
        prdParams.ie_lado_p = side
        prdParams.cd_intervalo_p = intervalCode
        prdParams.ie_acm_p = 'N'
        prdParams.ds_horarios_p = ''
        prdParams.ie_se_necessario_p = isNecessary
        prdParams.ie_anestesia_p = null
        prdParams.ds_justificativa_proc_p = justification
        prdParams.cd_material_p = materialCode
        prdParams.ds_material_p = materialDescription
        prdParams.ds_ind_material_p = materialInd
        prdParams.ie_via_aplicacao_p = applicationVia
        prdParams.qt_dose_p = quantityDose
        prdParams.cd_unidade_medida_dose_p = unityCode
        prdParams.cd_especialidade_p = null
        prdParams.cd_especialidade_dest_p = especialidadeCode // 6
        prdParams.ds_encaminhamento_p = encaminhamentoText
        prdParams.ds_orientacao_p = orientacao
        prdParams.queixa_p = queixa
        prdParams.hda_p = hda
        prdParams.diagnostico_p = diagnostico
        prdParams.hpp_p = hpp
        prdParams.alergias_p = alergias
        prdParams.medicacoes_de_uso_comum_p = medicacoes_de_uso_comum
        prdParams.habitos_p = habitos
        prdParams.antecedentes_pessoais_p = antecedentes_pessoais
        prdParams.hfam_p = hfam
        prdParams.sinais_vitais_p = sinais_vitais
        prdParams.conduta_medica_p = conduta_medica
        prdParams.exame_fisico_p = exame_fisico
        prdParams.exame_imagem_p = exame_imagem
        prdParams.exame_lab_p = exame_lab

        await executeProcedure_GHAS_PRESCR_MEDFLOW_P(prdParams)

       /* sinais vitais proc */

        prdSinaisVitaisParams.nr_atendimento_p = attendanceData.resource.identifier.find(
          (item) => item.use === 'usual',
        ).value

        prdSinaisVitaisParams.cd_medico_p = doctorData // 1367

        prdSinaisVitaisParams.nr_prescr_medflow_p = medflowBundle.id
        prdSinaisVitaisParams.vl_temperatura_p = ' '
        prdSinaisVitaisParams.vl_peso_p = ' '
        prdSinaisVitaisParams.vl_altura_p = ' '
        prdSinaisVitaisParams.vl_freq_respiratoria_p = ' '
        prdSinaisVitaisParams.vl_freq_cardiaca_p = ' '
        prdSinaisVitaisParams.vl_pressao_sis_p = ' '
        prdSinaisVitaisParams.vl_pressao_dia_p = ' '
        prdSinaisVitaisParams.vl_oximetria_p = ' '
        prdSinaisVitaisParams.vl_glicemia_p = ' '
        prdSinaisVitaisParams.vl_circ_cabeca_p = ' '
        prdSinaisVitaisParams.vl_circ_abdominal_p = ' '

        await executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P(prdSinaisVitaisParams)
         
        console.log('(INF) Concluiu a execução!')
        index++
      }

      return reply.status(201).send()
    },
  )
}
