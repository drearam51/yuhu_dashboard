
import pandas as pd
import re
import os

def procesar_chat_a_dataframe(ruta_archivo):
    """
    Lee un archivo de exportación de chat de WhatsApp, lo procesa y lo convierte
    en un DataFrame de pandas.

    El formato esperado es:
    dd/mm/yyyy, hh:mm a.m./p.m. - Autor: Mensaje

    Args:
        ruta_archivo (str): La ruta al archivo de texto del chat.

    Returns:
        pandas.DataFrame: Un DataFrame con las columnas ['Fecha', 'Hora', 'Autor', 'Mensaje']
                          o None si el archivo no se encuentra.
    """
    if not os.path.exists(ruta_archivo):
        print(f"Error: El archivo no se encontró en la ruta: {ruta_archivo}")
        return None

    # Patrón de regex para extraer fecha, hora, autor y mensaje.
    # Este patrón busca líneas que comiencen con una fecha y hora.
    # Ejemplo: "18/2/2025, 9:06 p. m. - Autor: Mensaje"
    # El espacio entre la hora y a.m./p.m. puede ser un espacio normal o uno especial de WhatsApp (\u202f).
    patron = re.compile(r"^(?P<fecha>\d{1,2}/\d{1,2}/\d{4}), (?P<hora>\d{1,2}:\d{2}(?:\u202f|\s)(?:a|p)\.\s?m\. - )(?P<autor>[^:]+): (?P<mensaje>.*)", re.DOTALL)

    datos = []
    with open(ruta_archivo, 'r', encoding='utf-8') as archivo:
        contenido_completo = archivo.read()

    # Usamos finditer para manejar mensajes multilínea más eficientemente.
    # Primero, dividimos el texto por el patrón de inicio de mensaje.
    # El patrón usa un lookahead positivo para no consumir el delimitador.
    mensajes_crudos = re.split(r'(?=\d{1,2}/\d{1,2}/\d{4}, \d{1,2}:\d{2}(?:\u202f|\s)(?:a|p)\.\s?m\. - )', contenido_completo)
    
    for bloque_mensaje in mensajes_crudos:
        if bloque_mensaje.strip() == "":
            continue

        match = patron.match(bloque_mensaje)
        if match:
            datos.append({
                'Fecha': match.group('fecha'),
                'Hora': match.group('hora').replace('\u202f', ' ').strip(),
                'Autor': match.group('autor').strip(),
                'Mensaje': match.group('mensaje').strip()
            })
        # Las líneas que no coinciden (mensajes del sistema al inicio, etc.) son ignoradas.

    if not datos:
        print("No se pudieron extraer datos del chat. Revisa el formato del archivo.")
        return pd.DataFrame()

    df = pd.DataFrame(datos)

    # Limpieza y conversión de tipos
    df['Mensaje'] = df['Mensaje'].str.replace('\n', ' ', regex=False)
    try:
        df['Fecha'] = pd.to_datetime(df['Fecha'], format='%d/%m/%Y')
    except ValueError as e:
        print(f"Advertencia: No se pudo convertir toda la columna 'Fecha' a datetime. Error: {e}")

    return df

if __name__ == "__main__":
    # Nombre del archivo de chat
    nombre_archivo = 'chat.txt'
    
    # Construir la ruta absoluta al archivo
    ruta_absoluta_archivo = os.path.join(os.getcwd(), nombre_archivo)

    # Procesar el chat
    df_chat = procesar_chat_a_dataframe(ruta_absoluta_archivo)

    if df_chat is not None and not df_chat.empty:
        print("Se procesó el chat y se convirtió a DataFrame. Primeras 5 filas:")
        print(df_chat.head())

        print("\nInformación del DataFrame:")
        df_chat.info()

        # Guardar el resultado en un archivo CSV
        ruta_csv = os.path.join(os.getcwd(), 'chat_procesado.csv')
        df_chat.to_csv(ruta_csv, index=False)
        print(f"\nEl DataFrame se ha guardado en: {ruta_csv}")
