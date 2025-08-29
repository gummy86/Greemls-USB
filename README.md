
🛡️ Greemls - The Human Immunity

"Si no existe, lo creamos. Si no puede, lo hacemos posible." - César Sánchez

🔥 ¿Qué es Greemls?

Greemls no es solo otra herramienta de rescate. Es un sistema inmunológico digital nacido de la desesperación, la ruina y la negativa a aceptar la derrota. Es un USB booteable de resistencia, construido para cazar y eliminar las amenazas más persistentes que existen: rootkits, bootkits y malware de alta persistencia que herramientas comerciales no pueden tocar.

Está construido sobre BlackArch Linux y armado con un arsenal de herramientas de forense, reversa y recuperación, todo envuelto en un sistema camuflado, encriptado y auto-reparable.

🎯 Nacido de una Pesadilla Real

Esta es la historia de su creador:

· "Fui víctima de un ataque de malware... al principio no sabía que un malware pudiera tener habilidades muy fuertes."
· "Pensando las cosas fáciles, me fui dejando en la ruina: equipos de cómputo prestados infectados, celulares, mi familia, vecinos y amigos infectados... hasta en el stereo del carro y mi Alexa."
· "Llegué a un grado donde no sabía qué hacer, teniendo el gusano en frente y no poderlo eliminar... después dándome cuenta que no solo era 1, eran 5 rootkit's y bootkit's."
· "Se encargaban de revisar, bloquear e infectar cualquier USB que yo metiera. Las mejores herramientas ninguna me sirvió... Un día me quedé pensando, '¿cómo voy a pagar todo esto?' y dije: 'Si no encuentro, ¿por qué no lo diseño?'".

Y así nació Greemls.

⚙️ Características Principales

· 🕵️‍♂️ Camuflaje Avanzado: Bootea discretamente como "Windows Recovery" para evitar la detección por parte del malware.
· 🔒 Encriptación Total: Todo el sistema y sus logs forenses están protegidos.
· 📝 Logging Forense en RAM: Registra cada movimiento del enemigo sin dejar rastro en el disco infectado.
· 🛡️ Modo Solo-Lectura: Monta los discos del host como solo lectura por defecto para análisis forense seguro.
· 🔧 Auto-Reparación: Capacidad para regenerar su sistema de archivos y componentes críticos si son comprometidos.
· ⚔️ Arsenal BlackArch: Incluye acceso a miles de herramientas profesionales de seguridad ofensiva y forense.
· 🧠 Scripts de Ataque Especializados: Comandos "Greemls" personalizados para limpieza agresiva de MBR y sectores de boot.

🚀 ¿Cómo Usarlo?

1. Descarga la Aplicación y crea tu booteable más reciente.
2. Integra tus iso's o herramientas .exe al USB encuentra la opción encriptado y camuflaje 
3. Conecta el USB a la máquina infectada.
4. Arranca desde el USB (puede necesitar desactivar Secure Boot en la BIOS/UEFI).
5. Sobrevive. Analiza. Limpia.

Comandos Rápidos desde la Live Session:

```bash
# Escaneo forense automático (Lee y analiza sin escribir)
greemls-scan

# Limpieza agresiva del Bootkit (¡ADVERTENCIA: Destructivo!)
greemls-clean

# Actualizar la base de datos de herramientas
pacman -Syy

# Instalar una herramienta específica de BlackArch
pacman -S <blackarch-tool-name>
```

📖 Consejos de un Sobreviviente

Del diario de batalla de César:

· "No te alarmes." Mantén la calma para pensar con claridad.
· "Revisa su comportamiento." Estudia cómo actúa el malware. Su arrogancia es su debilidad.
· "Revisa tu teléfono celular." El malware es multiplataforma. Te engaña con falsas recuperaciones.
· "Donde pones tu contraseña nunca la pongas doble vez." Si sale una pantalla y de repente otra con lo mismo, ALTO. Ahí no sigas. Es un engaño para robar tu información.

🤝 ¿Cómo Contribuir?

Greemls es un proyecto de pasión y survivalismo. Toda ayuda es bienvenida.

1. Pruébalo en máquinas virtuales.
2. Reporta issues y sugiere herramientas.
3. Ayuda a mejorar los scripts y la documentación.
4. Corre la voz para que nadie más pase por esto.

📜 Licencia

Este proyecto está bajo la Licencia MIT. ¡Usa este poder con responsabilidad!

👤 Autor

César Sánchez - Un mexicano que se negó a rendirse.

"Esta es una herramienta para que no pases lo que yo pase."

---

¡Recuerda! La mejor herramienta es la que nunca tienes que usar. Mantén tu sistema seguro. Pero si la necesitas, Greemls tendrá tu espalda.

---

¿Listo para convertirte en Immunity?
