import streamlit as st
from langchain_groq import ChatGroq
from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper, PubMedAPIWrapper
from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun, DuckDuckGoSearchRun
from langchain_community.tools.pubmed.tool import PubmedQueryRun
from langchain.agents import initialize_agent, AgentType
from langchain.callbacks import StreamlitCallbackHandler
from langchain_community.retrievers import PubMedRetriever
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize PubMedAPIWrapper and PubmedQueryRun
pubmed_api_key = "bc7567cae4b14273180aa48ad2419bdb9f08"
pubmed_wrapper = PubMedAPIWrapper(top_k_results=1, doc_content_chars_max=200)
pubmed = PubmedQueryRun(api_wrapper=pubmed_wrapper)

# Initialize other tools
arxiv_wrapper = ArxivAPIWrapper(top_k_results=1, doc_content_chars_max=200)
arxiv = ArxivQueryRun(api_wrapper=arxiv_wrapper)

wiki_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=200)
wiki = WikipediaQueryRun(api_wrapper=wiki_wrapper)

search = DuckDuckGoSearchRun(name="Search")

# Streamlit UI
st.title("🔎 LangChain - Chat with Search")
"""
In this example, we're using `StreamlitCallbackHandler` to display the thoughts and actions of an agent in an interactive Streamlit app.
Try more LangChain 🤝 Streamlit Agent examples at [github.com/langchain-ai/streamlit-agent](https://github.com/langchain-ai/streamlit-agent).
"""

st.sidebar.title("Settings")
api_key_gorp = st.sidebar.text_input("Enter your Groq API Key:", type="password")

if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {"role": "assistant", "content": "Hi, I'm a chatbot who can search the web. How can I help you?"}
    ]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg['content'])

if prompt := st.chat_input(placeholder="Could you fetch me information on diabetes?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)

    llm = ChatGroq(groq_api_key=api_key_gorp, model_name="mixtral-8x7b-32768", streaming=True)
    tools = [search, arxiv, wiki, pubmed]

    search_agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, handle_parsing_errors=True)

    with st.chat_message("assistant"):
        #st_cb = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False)
        #response = search_agent.run(st.session_state.messages, callbacks=[st_cb])
        response = search_agent.run(st.session_state.messages)
        st.session_state.messages.append({'role': 'assistant', "content": response})
        st.write(response)
