from django.urls import path, include
from rest_framework import routers
from api.views import UploadViewSet

router = routers.DefaultRouter()
router.register('upload-assignment', UploadViewSet, basename="upload-assignment")

urlpatterns = [
    path('', include(router.urls)),
]