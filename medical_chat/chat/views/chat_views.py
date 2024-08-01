from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from chat.serializers import UserSerializer, UserSerializerWithToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.hashers import make_password
from rest_framework import status


from langchain_groq import ChatGroq
from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper, PubMedAPIWrapper
from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun, DuckDuckGoSearchRun
from langchain_community.tools.pubmed.tool import PubmedQueryRun
from langchain.agents import initialize_agent, AgentType
import os


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def search(request):
    messages = request.data.get('messages')

    pubmed_wrapper = PubMedAPIWrapper(top_k_results=1, doc_content_chars_max=200)
    arxiv_wrapper = ArxivAPIWrapper(top_k_results=1, doc_content_chars_max=200)
    wiki_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=200)
    search = DuckDuckGoSearchRun(name="Search")

    llm = ChatGroq(groq_api_key=os.getenv("GROQ_API_KEY"), model_name="mixtral-8x7b-32768", streaming=True)
    tools = [search, ArxivQueryRun(api_wrapper=arxiv_wrapper), WikipediaQueryRun(api_wrapper=wiki_wrapper), PubmedQueryRun(api_wrapper=pubmed_wrapper)]

    search_agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, handle_parsing_errors=True)

    response = search_agent.run(messages)
    return Response(response)