<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('credits_max_amount', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('bank_id');
            $table->integer('credit_type_id');
            $table->decimal('max_amount', 8, 2,true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('banks_max_amount');
    }
};
