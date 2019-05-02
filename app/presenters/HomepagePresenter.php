<?php

namespace App\Presenters;

use APIModel;

final class HomepagePresenter extends BasePresenter
{


	public function actionDefault()
	{
		/**
		 *
		 *			DEMO: HOW TO ACCESS API RESOURCES, BASIC AND NESTED
		 *
		 */

		$modelsModel = $this->context->getByType(APIModel\ModelsModel::class);
		$versionModel = $this->context->getByTYpe(APIModel\VersionModel::class);
		$compartmentsModel = $this->context->getByTYpe(APIModel\CompartmentsModel::class);
		$speciesModel = $this->context->getByType(APIModel\SpeciesModel::class);

		$models = $modelsModel->getCollection();

		foreach ($models as $model) {
			dump('model', $model['id']);
			$compartmentsModel->setParent($modelsModel, $model['id']);

			$compartments = $compartmentsModel->getCollection();

			foreach ($compartments as $compartment) {

				dump('compartments', $compartment['id']);

				$speciesModel->setParent($compartmentsModel, $compartment['id']);
				$species = $speciesModel->getCollection();
				dump('species', $species);
			}
		}
	}

}
